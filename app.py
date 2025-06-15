from flask import Flask, url_for, redirect, session, request, render_template
import os


app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")


@app.route("/",methods=["GET","POST"])
def home():
    return render_template("home.html")



@app.route("/contact",methods=["GET","POST"])
def contact():
    return render_template("contact.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)