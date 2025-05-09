# Financial Momentum Tracker 2 Setup

This repository contains scripts to clone and analyze the Financial Momentum Tracker 2 repository from GitHub, preparing it for future modifications and development.

## Setup Instructions

1. Make the scripts executable:
   ```bash
   chmod +x clone_repo.sh
   chmod +x analyze_codebase.py
   ```

2. Run the clone script:
   ```bash
   ./clone_repo.sh
   ```

This will:
- Clone the repository from https://github.com/prajwalMastercard/drive
- Analyze the codebase structure
- Generate a comprehensive report of the codebase
- Prepare the environment for future development

## Generated Reports

After running the scripts, two analysis files will be generated:

1. `codebase_analysis.md` - A human-readable Markdown report with:
   - Entry points identification
   - Language statistics
   - Framework detection
   - Directory structure
   - Setup instructions based on the detected tech stack
   - Next steps for development

2. `codebase_analysis.json` - Raw analysis data in JSON format for further processing if needed

## Repository Structure

The cloned repository will be available in the `financial-momentum-tracker` directory. You can explore it and start implementing the upcoming requirements based on this foundation.

## Next Steps

After the analysis is complete:

1. Review the generated reports to understand the codebase
2. Follow the setup instructions in the analysis report to configure the development environment
3. Wait for the upcoming requirements
4. Plan your implementation approach
5. Create development branches for new features
6. Implement and test the new requirements

## Troubleshooting

If you encounter any issues:

- Ensure you have git installed on your system
- Check your internet connection
- Verify the repository URL is correct
- Make sure you have the necessary permissions to clone the repository
