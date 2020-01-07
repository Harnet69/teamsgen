from flask import Flask, flash, render_template, request, redirect, session, escape, url_for

app = Flask(__name__)


# The main index page
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
