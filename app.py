from flask import Flask, url_for, redirect, session, request, render_template
from flask_mail import Mail,Message
import os


app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")

# デプロイするときにはまとめてsystemdのserviceファイルに入力
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("GMAIL_ADRESS")
app.config["MAIL_PASSWORD"] = os.environ.get("GMAIL_PASS")

mail = Mail(app)

 
@app.route("/",methods=["GET","POST"])
def home():
    return render_template("home.html")

# senderとrecipientsの違い
# sender → 誰が送ったか  recipients → 誰に送るかのメールアドレス
@app.route("/contact",methods=["GET","POST"])
def contact():
    if request.method == "POST":
        company = request.form.get("company")
        name = request.form.get("name")
        mail_address = request.form["mail"]
        tel = request.form.get("tel")
        inquity = request.form.getlist("inquiry")
        message = request.form.get("message")
        privacy = request.form.get("privacy")        
        
        admin_msg = Message(subject="【お問い合わせ】フォームからの通知",
                            sender=app.config["MAIL_USERNAME"],
                            recipients=[app.config["MAIL_USERNAME"]]
                            )
        admin_msg.body = f"会社名：{company}\nお名前：{name}\nメールアドレス：{mail_address}" +\
                        f"電話番号：{tel}\nお問い合わせ種類：{inquity}\nお問い合わせ内容：{message}\nプライバシー合意：{privacy}"
        
        mail.send(admin_msg)
        
        user_msg = Message(subject="お問い合わせありがとうございます。",
                           sender=app.config["MAIL_USERNAME"],
                           recipients=[mail_address]
                           )
        user_msg.body = f"""{name}様
お問い合わせありがとうございます。
以下の内容で受け付けました。

---

{message}

---

担当者より折り返しご連絡いたします。
"""
        
        mail.send(user_msg)
        return redirect("/contact")
        
    return render_template("contact.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    
    
# やること
# titleboxの文字をスマホで画面いっぱいに広げる
# ハンバーガーメニューを開いた後にバツ印をつくる
# 全体的に大きくする（スマホ版が小さすぎる）
#Contactを全体的に左右に広げて余裕を持たせるmediaクエリ