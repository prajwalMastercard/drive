import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import * as path from 'path';
import * as fs from 'fs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached_assets directory for static files like PowerPoint templates
const assetsPath = path.resolve(process.cwd(), 'attached_assets');
console.log('Serving attached assets from:', assetsPath);
app.use('/attached_assets', express.static(assetsPath));

// Special route to serve the PowerPoint file
app.get('/download-ppt', (req, res) => {
  try {
    // Construct the path to the PowerPoint file with spaces in the name
    const filePath = path.resolve(process.cwd(), 'attached_assets', 'Recommendations Insights.pptx');
    console.log('Direct download PPTX from:', filePath);
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error('PowerPoint file not found at path:', filePath);
      
      // Try alternate file name without spaces
      const altFilePath = path.resolve(process.cwd(), 'attached_assets', 'RecommendationsInsights.pptx');
      if (!fs.existsSync(altFilePath)) {
        console.error('Alternative PowerPoint file not found at path:', altFilePath);
        return res.status(404).send('PowerPoint file not found');
      }
      
      console.log('Using alternative file path:', altFilePath);
      
      // Get file stats for Content-Length header
      const stats = fs.statSync(altFilePath);
      console.log('PowerPoint file size:', stats.size, 'bytes');
      
      // Set headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
      res.setHeader('Content-Disposition', 'attachment; filename="Recommendations Insights.pptx"');
      res.setHeader('Content-Length', stats.size);
      
      // Stream file to response
      const fileStream = fs.createReadStream(altFilePath);
      fileStream.pipe(res);
      return;
    }
    
    // Get file stats for Content-Length header
    const stats = fs.statSync(filePath);
    console.log('PowerPoint file size:', stats.size, 'bytes');
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', 'attachment; filename="Recommendations Insights.pptx"');
    res.setHeader('Content-Length', stats.size);
    
    // Stream file to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving PowerPoint file:', error);
    res.status(500).send('Error serving PowerPoint file: ' + (error instanceof Error ? error.message : String(error)));
  }
});

// Debug route to list files in attached_assets directory
app.get('/debug/list-files', (req, res) => {
  try {
    const dirPath = path.resolve(process.cwd(), 'attached_assets');
    console.log('Listing files in directory:', dirPath);
    
    const files = fs.readdirSync(dirPath);
    console.log('Files in directory:', files);
    
    const fileDetails = files.map(file => {
      const filePath = path.join(dirPath, file);
      try {
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          isDirectory: stats.isDirectory(),
          created: stats.birthtime,
          modified: stats.mtime
        };
      } catch (e) {
        return { name: file, error: String(e) };
      }
    });
    
    res.json({ directoryPath: dirPath, files: fileDetails });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: String(error) });
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
