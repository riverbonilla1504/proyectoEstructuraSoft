from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing
PORT = 3001  # Define the port on which the server will run

# Database connection configuration
try:
    connection = mysql.connector.connect(
        host='miproyectodb.c9mqeqm82gme.us-east-2.rds.amazonaws.com',
        user='admin',
        password='river123',
        database='signup',
        port=3306
    )

    if connection.is_connected():
        print('Connected to MySQL database')
except Error as e:
    print('Error connecting to MySQL:', e)

# Route to check if a user exists
@app.route('/check-user', methods=['POST'])
def check_user():
    email = request.json.get('email')  # Get email from request JSON

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM login WHERE email = %s", (email,))
        result = cursor.fetchall()
        cursor.close()
        return jsonify({'exists': len(result) > 0})
    except Error as e:
        print('Error querying the database:', e)
        return jsonify({'error': 'An error occurred while checking the user'}), 500

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return {'error': 'All fields are required'}, 400

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT email, password, betaccess FROM login WHERE email = %s AND password = %s", (email, password))
        result = cursor.fetchone()
        cursor.close()

        if result is None:
            return {'error': 'Invalid email or password'}, 401
        else:
            # Return user data and betaccess value
            return {'message': 'Login successful', 'betaccess': result['betaccess']}, 200
    except Error as e:
        print('Error selecting values:', e)
        return {'error': 'An error occurred while selecting values'}, 500

# Route for admin login
@app.route('/login-admin', methods=['POST'])
def login_admin():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return 'All fields are required', 400

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM loginadmin WHERE email = %s AND password = %s AND admin = TRUE", (email, password))
        result = cursor.fetchall()
        cursor.close()

        if len(result) == 0:
            return 'Invalid email or password', 401
        else:
            return 'Login successful'
    except Error as e:
        print('Error selecting values:', e)
        return 'An error occurred while selecting values', 500

# Route for user signup
@app.route('/signup', methods=['POST'])
def signup():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    if not name or not email or not password:
        return 'All fields are required', 400

    try:
        cursor = connection.cursor()
        cursor.execute("INSERT INTO login (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
        connection.commit()
        cursor.close()
        return 'Values Inserted'
    except Error as e:
        print('Error inserting values:', e)
        return 'An error occurred while inserting values', 500

# Route to get all users
@app.route('/users', methods=['GET'])
def get_users():
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM login")
        result = cursor.fetchall()
        cursor.close()
        return jsonify(result)
    except Error as e:
        print('Error querying the database:', e)
        return 'An error occurred while retrieving users', 500

# Route to accept a user
@app.route('/accept-user', methods=['POST'])
def accept_user():
    email = request.json.get('email')

    if not email:
        return 'Email is required', 400

    try:
        cursor = connection.cursor()
        cursor.execute("UPDATE login SET betaccess = TRUE WHERE email = %s", (email,))
        connection.commit()
        cursor.close()
        return 'User updated successfully'
    except Error as e:
        print('Error updating user:', e)
        return 'An error occurred while updating user', 500

# Start the server
if __name__ == '__main__':
    app.run(port=PORT)
