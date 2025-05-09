#!/usr/bin/env python3

import os
import sys
import re
from collections import defaultdict
import json

def analyze_directory(directory):
    """Analyze the repository structure and content."""
    
    result = {
        "directory_structure": {},
        "file_types": defaultdict(int),
        "language_stats": defaultdict(int),
        "potential_frameworks": set(),
        "entry_points": [],
        "readme_content": "",
        "configuration_files": []
    }
    
    # Extension to language mapping
    extension_map = {
        ".py": "Python",
        ".js": "JavaScript",
        ".jsx": "React",
        ".ts": "TypeScript",
        ".tsx": "React/TypeScript",
        ".html": "HTML",
        ".css": "CSS",
        ".scss": "SCSS",
        ".json": "JSON",
        ".md": "Markdown",
        ".yml": "YAML",
        ".yaml": "YAML",
        ".sh": "Shell",
        ".java": "Java",
        ".php": "PHP",
        ".go": "Go",
        ".rb": "Ruby",
        ".rs": "Rust",
        ".c": "C",
        ".cpp": "C++",
        ".h": "C/C++ Header",
        ".swift": "Swift"
    }
    
    # Framework detection patterns
    framework_patterns = {
        "react": [r"import\s+React", r"from\s+'react'", r"from\s+\"react\"", "react-dom"],
        "angular": ["@angular", "ngModule", "Component({"],
        "vue": ["Vue.", "new Vue", "<template>", "createApp"],
        "django": ["from django", "urls.py", "settings.py", "wsgi.py"],
        "flask": ["from flask import", "Flask(__name__)", "@app.route"],
        "express": ["express()", "app.get(", "app.use(", "app.post("],
        "next.js": ["next/app", "next/document", "getStaticProps", "getServerSideProps"],
        "spring": ["@SpringBootApplication", "@Controller", "@RestController", "@Service"],
        "laravel": ["Illuminate\\", "artisan", "php artisan"],
        "tensorflow": ["import tensorflow", "from tensorflow"],
        "pytorch": ["import torch", "from torch"],
        "pandas": ["import pandas", "pd.DataFrame"],
        "numpy": ["import numpy", "np.array"]
    }
    
    # Track directory structure
    for root, dirs, files in os.walk(directory):
        rel_path = os.path.relpath(root, directory)
        if rel_path == ".":
            current_dir = result["directory_structure"]
        else:
            # Navigate to the correct nested dictionary
            current_dir = result["directory_structure"]
            for part in rel_path.split(os.sep):
                if part not in current_dir:
                    current_dir[part] = {}
                current_dir = current_dir[part]
        
        # Add files to the current directory
        for file in files:
            current_dir[file] = None
            
            # Count file types
            _, ext = os.path.splitext(file)
            if ext:
                result["file_types"][ext] += 1
                if ext in extension_map:
                    result["language_stats"][extension_map[ext]] += 1
            
            # Check for common entry points
            if file in ["main.py", "app.py", "index.js", "server.js", "manage.py", "app.js"]:
                result["entry_points"].append(os.path.join(rel_path, file))
            
            # Check for configuration files
            if file in ["package.json", "requirements.txt", "Dockerfile", "docker-compose.yml", 
                        ".gitignore", "tsconfig.json", "webpack.config.js", "babel.config.js"]:
                result["configuration_files"].append(os.path.join(rel_path, file))
            
            # Get README content
            if file.lower() == "readme.md":
                readme_path = os.path.join(root, file)
                try:
                    with open(readme_path, 'r', encoding='utf-8') as f:
                        result["readme_content"] = f.read()
                except Exception as e:
                    result["readme_content"] = f"Error reading README: {str(e)}"
            
            # Analyze file content for framework detection
            file_path = os.path.join(root, file)
            try:
                if os.path.getsize(file_path) < 1000000:  # Skip files larger than 1MB
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        for framework, patterns in framework_patterns.items():
                            for pattern in patterns:
                                if re.search(pattern, content):
                                    result["potential_frameworks"].add(framework)
                                    break
            except Exception:
                # Skip files that can't be read as text
                pass
    
    # Convert defaultdict to regular dict for JSON serialization
    result["file_types"] = dict(result["file_types"])
    result["language_stats"] = dict(result["language_stats"])
    result["potential_frameworks"] = list(result["potential_frameworks"])
    
    return result

def generate_report(analysis_result, output_file="codebase_analysis.md"):
    """Generate a markdown report from the analysis results."""
    
    report = "# Financial Momentum Tracker Codebase Analysis\n\n"
    
    # Add entry points section
    report += "## Entry Points\n\n"
    if analysis_result["entry_points"]:
        for entry in analysis_result["entry_points"]:
            report += f"- `{entry}`\n"
    else:
        report += "No common entry points detected.\n"
    
    # Add language statistics
    report += "\n## Language Statistics\n\n"
    if analysis_result["language_stats"]:
        for lang, count in sorted(analysis_result["language_stats"].items(), key=lambda x: x[1], reverse=True):
            report += f"- {lang}: {count} files\n"
    else:
        report += "No recognized programming languages detected.\n"
    
    # Add potential frameworks
    report += "\n## Detected Frameworks/Libraries\n\n"
    if analysis_result["potential_frameworks"]:
        for framework in sorted(analysis_result["potential_frameworks"]):
            report += f"- {framework}\n"
    else:
        report += "No common frameworks or libraries detected.\n"
    
    # Add configuration files
    report += "\n## Configuration Files\n\n"
    if analysis_result["configuration_files"]:
        for config in analysis_result["configuration_files"]:
            report += f"- `{config}`\n"
    else:
        report += "No configuration files detected.\n"
    
    # Add directory structure overview
    report += "\n## Directory Structure Overview\n\n"
    report += "```\n"
    
    def print_dir_structure(structure, prefix="", is_last=True):
        nonlocal report
        
        for i, (name, content) in enumerate(sorted(structure.items())):
            is_last_item = i == len(structure) - 1
            report += f"{prefix}{'└── ' if is_last_item else '├── '}{name}\n"
            
            if content is not None:  # It's a directory
                new_prefix = prefix + ('    ' if is_last_item else '│   ')
                print_dir_structure(content, new_prefix, is_last_item)
    
    print_dir_structure(analysis_result["directory_structure"])
    report += "```\n"
    
    # Add README content if available
    if analysis_result["readme_content"]:
        report += "\n## README Content\n\n"
        report += "```markdown\n"
        report += analysis_result["readme_content"]
        report += "\n```\n"
    
    # Add setup instructions section
    report += "\n## Setup Instructions\n\n"
    report += "Based on the repository analysis, follow these steps to set up the development environment:\n\n"
    
    # Detect project type and provide setup instructions
    if ".py" in analysis_result["file_types"] or "Python" in analysis_result["language_stats"]:
        report += "### Python Project Setup:\n\n"
        report += "1. Create a virtual environment:\n"
        report += "   ```bash\n"
        report += "   python -m venv venv\n"
        report += "   source venv/bin/activate  # On Windows: venv\\Scripts\\activate\n"
        report += "   ```\n\n"
        report += "2. Install dependencies (if requirements.txt exists):\n"
        report += "   ```bash\n"
        report += "   pip install -r requirements.txt\n"
        report += "   ```\n\n"
        
        # Add run instructions based on entry points
        if any("py" in entry for entry in analysis_result["entry_points"]):
            report += "3. Run the application:\n"
            for entry in analysis_result["entry_points"]:
                if entry.endswith(".py"):
                    report += f"   ```bash\n   python {entry}\n   ```\n\n"
    
    if ".js" in analysis_result["file_types"] or "JavaScript" in analysis_result["language_stats"]:
        report += "### JavaScript/Node.js Project Setup:\n\n"
        report += "1. Install dependencies:\n"
        report += "   ```bash\n"
        report += "   npm install\n"
        report += "   ```\n\n"
        
        # Add run instructions based on entry points
        if any(entry.endswith(".js") for entry in analysis_result["entry_points"]):
            report += "2. Run the application:\n"
            for entry in analysis_result["entry_points"]:
                if entry.endswith(".js"):
                    report += f"   ```bash\n   node {entry}\n   ```\n\n"
        
        # If it might be a frontend project with build step
        if "React" in analysis_result["language_stats"] or "react" in analysis_result["potential_frameworks"]:
            report += "   For React development:\n"
            report += "   ```bash\n"
            report += "   npm start\n"
            report += "   ```\n\n"
    
    # Add next steps section
    report += "## Next Steps\n\n"
    report += "1. Review the codebase thoroughly to understand its functionality\n"
    report += "2. Identify areas that need to be modified according to upcoming requirements\n"
    report += "3. Create a development branch for implementing new features\n"
    report += "4. Set up a testing environment to validate changes\n"
    report += "5. Document any changes made to the codebase\n"
    
    # Write the report to a file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"Report generated: {output_file}")
    print("\nSummary:")
    
    # Print a brief summary to console
    print(f"- Entry points: {len(analysis_result['entry_points'])}")
    print(f"- Languages: {', '.join(analysis_result['language_stats'].keys())}")
    print(f"- Frameworks: {', '.join(analysis_result['potential_frameworks'])}")
    print(f"- Configuration files: {len(analysis_result['configuration_files'])}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_codebase.py <repository_directory>")
        sys.exit(1)
    
    repo_dir = sys.argv[1]
    if not os.path.isdir(repo_dir):
        print(f"Error: {repo_dir} is not a valid directory")
        sys.exit(1)
    
    analysis = analyze_directory(repo_dir)
    generate_report(analysis)
    
    # Also save raw analysis as JSON for potential further processing
    with open("codebase_analysis.json", 'w', encoding='utf-8') as f:
        json.dump(analysis, f, indent=2)
