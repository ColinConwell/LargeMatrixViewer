# Matrix Visualization Tool

An interactive web-based tool for visualizing and analyzing large matrices with advanced exploration capabilities.

## Features

- 🎯 Interactive matrix visualization with zoom and pan
- 🔍 Detailed cell inspection
- 📊 Support for large matrices (up to 10000 x 10000)
- 🔄 Matrix generation with custom dimensions
- 📥 Import matrices from JSON or CSV files
- 📤 Export matrices to JSON or CSV formats
- 📐 Lower triangle view mode for square matrices
- 🎨 Heat map visualization of matrix values

## Installation

1. Make sure you have Node.js 18+ installed
2. Clone this repository
3. Install dependencies:
```bash
npm install
```

## Development

Run the development server:

```bash
./launch.sh
```

Or manually:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Usage Guide

### Matrix Controls

- **Zoom**: Use the zoom buttons or mouse wheel to zoom in/out
- **Pan**: Click and drag to pan around the matrix
- **Reset View**: Click the reset button to return to the default view
- **Cell Selection**: Click any cell to view its details in the sidebar

### Matrix Operations

1. **Generate Matrix**:
   - Enter desired dimensions (up to 10000 x 10000)
   - Click "Generate" to create a random matrix

2. **Import Matrix**:
   - Click the upload button
   - Select a JSON or CSV file
   - Supported formats:
     - JSON: 2D array of numbers
     - CSV: Comma-separated values with numbers

3. **Export Matrix**:
   - Click the download button
   - Choose between JSON or CSV format

4. **Lower Triangle View**:
   - Toggle the "Lower Triangle" switch to show only the lower triangular portion of the matrix

## Development Setup

The project uses:

- React + TypeScript for the frontend
- Express for the backend
- Shadcn UI components
- TanStack Query for data fetching
- Tailwind CSS for styling

### Project Structure

```
├── client/              # Frontend code
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── lib/        # Utility functions
│   │   └── pages/      # Page components
├── server/             # Backend code
│   ├── routes.ts      # API routes
│   └── storage.ts     # Data storage
└── shared/            # Shared types and schemas
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
