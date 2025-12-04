# Privacy Policy

**BULC Building Designer - Claude Desktop Extension**

Last Updated: December 2025

## Overview

BULC Building Designer ("the Extension") is a Model Context Protocol (MCP) server that connects Claude Desktop to the BULC fire simulation software. This privacy policy explains how we handle your data.

## Data Collection

### What We DO NOT Collect

- **No Personal Information**: We do not collect names, email addresses, or any personal identifiers
- **No Building Designs**: Your building designs and project files remain entirely on your local machine
- **No Usage Analytics**: We do not track how you use the extension
- **No Telemetry**: No data is sent to our servers or any third party
- **No API Keys**: The extension does not require or store any API keys

### What the Extension Accesses

The extension accesses only:
- **Local BULC Application**: Communicates with the BULC software running on your computer via local TCP socket (port 19840)
- **Building Model Data**: Reads and modifies room/wall data within your local BULC project

## Data Processing

### Local Processing Only

All data processing occurs entirely on your local machine:
1. Claude Desktop sends commands to the MCP server
2. The MCP server communicates with BULC via local TCP connection
3. Building modifications are made in your local BULC project
4. No data leaves your computer

### Data Flow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Claude Desktop │ ──► │   MCP Server    │ ──► │  BULC App       │
│  (Local)        │ ◄── │   (Local)       │ ◄── │  (Local)        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         └──────────────────────┴───────────────────────┘
                    All on your local machine
```

## Third-Party Services

### Claude Desktop

This extension is designed to work with Claude Desktop, provided by Anthropic. When you use Claude Desktop:
- Your conversations with Claude are processed according to [Anthropic's Privacy Policy](https://www.anthropic.com/privacy)
- The extension itself does not send data to Anthropic; it only receives commands from Claude Desktop

### No Other Third Parties

The extension does not integrate with or send data to any other third-party services.

## Data Storage

### Local Storage Only

- **Project Files**: Stored by BULC in your chosen location
- **Configuration**: Claude Desktop stores MCP server configuration locally
- **No Cloud Storage**: We do not provide or use any cloud storage

### Data Retention

Since no data is collected by us, there is no data retention policy. Your local files are managed by you.

## Security

### Local Communication

- Communication between the MCP server and BULC occurs via localhost (127.0.0.1)
- No network traffic leaves your machine for extension functionality
- Standard TCP socket communication on configurable port (default: 19840)

### Open Source

The extension source code is available for review on GitHub, allowing you to verify our privacy practices.

## Children's Privacy

This extension is designed for professional use by architects, engineers, and building designers. It is not intended for use by children under 13 years of age.

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be posted on our GitHub repository with an updated "Last Updated" date.

## Your Rights

Since we do not collect personal data, traditional data rights (access, deletion, portability) do not apply. You maintain full control over your local project files.

## Contact Information

If you have questions about this privacy policy:

- **Email**: privacy@meteor-simulation.com
- **Website**: https://meteor-simulation.com/privacy
- **GitHub**: https://github.com/meteor-simulation/bulc-mcp-server/issues

## Summary

| Category | Our Practice |
|----------|-------------|
| Data Collection | None |
| Data Transmission | None (local only) |
| Third-Party Sharing | None |
| Data Storage | Local only |
| Analytics/Tracking | None |
| User Accounts | Not required |

---

**Meteor Simulation Inc.**

This extension respects your privacy by design. All functionality operates locally on your machine.
