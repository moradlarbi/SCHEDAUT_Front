# Instructions to Run the Application

## Backend Setup

1. Clone the backend repository:
   ```bash
   git clone <backend-repo-url>
   ```
2. Install dependencies:
   ```bash
   yarn
   ```
3. Run RabbitMQ:
   - Option 1: Use Docker (recommended):
     ```bash
     docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
     ```
   - Option 2: Install RabbitMQ locally. Follow [official installation guide](https://www.rabbitmq.com/download.html).

4. Create a `.env` file with the following content:
   ```env
   JAWSDB_URL=mysql://e3v5vqvmprsuzjfi:a4dps9zul7ar1t85@onnjomlc4vqc55fw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/pettlxfldr9yfyx0
   ```

5. Start the backend in development mode:
   ```bash
   yarn run dev
   ```

6. Install Python dependencies:
   ```bash
   pip install pymysql pika pulp sqlalchemy pandas datetime
   ```

7. Test RabbitMQ:
   ```bash
   python3 test_rabbitmq.py
   ```h

## Frontend Setup

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   yarn
   ```
3. Update the `proxy` field in `package.json` to point to the backend address.
4. Start the frontend:
   ```bash
   yarn run start