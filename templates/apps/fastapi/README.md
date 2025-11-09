# {{appName}}

FastAPI backend application.

## Setup

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Development

Run with:

```bash
{{packageManager}} dev
```

Or directly:

```bash
uvicorn app.main:app --reload
```

API will be available at:
- http://localhost:8000
- API docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Uvicorn Documentation](https://www.uvicorn.org)
