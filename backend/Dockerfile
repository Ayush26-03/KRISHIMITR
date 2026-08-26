FROM python:3.11-slim

WORKDIR /workspace

COPY requirements.txt /workspace/backend/requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir -r /workspace/backend/requirements.txt

COPY . /workspace/backend

ENV PYTHONPATH=/workspace
EXPOSE 8000

CMD ["python", "-m", "backend.app"]