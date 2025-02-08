npm install
```

## Development

Run the development server:

```bash
# Start on default port 5000
./launch.sh

# Or specify a custom port
./launch.sh -p 3000
```

Or manually:

```bash
npm run dev
```

The application will be available at `http://localhost:<port>`

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