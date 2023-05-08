from flask import Flask, redirect, url_for
from flask.ext.wtf import Form
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import Required, NumberRange
import requests

# Return requested line for a particular poem
def get_public_data(author, title, line):
    rep = requests.get(url="https://poetrydb.org/title/"+title+":abs/author,linecount,lines.json")
    if rep.status_code != 200:
        return None
    rep = rep.json()
    for i in range(len(rep)):
        if rep[i]["author"] == author:
            if line < int(rep[i]["linecount"]):
                return rep[i]["lines"][line]

# Store User data in the backend
def store_user_data(author, title, line):
    data = {
        "author": author,
        "title": title,
        "line": line
    }
    rep = requests.post(url="http://localhost:3000/", json=data)
    if rep.status_code != 200:
        return None
    return int(rep.json()["id"])

# Get User data in the backend
def get_user_data(id):
    rep = requests.get(url="http://localhost:3000/"+str(id))
    if rep.status_code != 200:
        return None
    rep = rep.json()
    author = rep["author"]
    title = rep["title"]
    line = rep["line"]
    return [(author, title, line)]

# Get all User data in the backend
def get_all_user_data():
    rep = requests.get(url="http://localhost:3000/")
    if rep.status_code != 200:
        return None
    rep = rep.json()
    data = []
    for i in range(len(rep)):
        author = rep["author"]
        title = rep["title"]
        line = rep["line"]
        data.append((author, title, line))
    return data

app = Flask(__name__)
app.config['SECRET_KEY'] = "SomeSecretKey"

class PoetryForm(Form):
    author = StringField('Who is your favourite poetry author?', validatorss=[Required()])
    title = StringField('What is the name of your favourite poem?', validatorss=[Required()])
    line = IntegerField('Which line of the poem is your favourite?', validatorss=[Required(), NumberRange(0)])
    submit = SubmitField('Submit')

class PoetryRequest(Form):
    id = IntegerField('Which form id would you like to see? (Leave blank to view all)')
    submit = SubmitField('Submit')

@app.route('/OtherForms', methods=['GET'])
def otherforms():

@app.route('/OtherForm/<id>', methods=['GET'])
def otherform(id):

@app.route('/', methods=['GET', 'POST'])
def index():
    poetry_form = PoetryForm()
    poetry_req = PoetryRequest()
    poem_line = ""
    if request.method == 'POST':
        if poetry_form.validate_on_submit():
            author = poetry_form.author.data
            title = poetry_form.title.data
            line = poetry_form.line.data
            success = store_user_data(author, title, line)
            if success is None:
                print("Failed to store user info!")
            poem_line = get_public_data(author, title, line)
            if poem_line is None:
                print("Poem not found from public api!")
                poem_line = ""
        if poetry_req.is_submited():
            if not poetry_req.id.data:
                data = get_all_user_data()
                if data is None:
                    print("Failed to get user info!")
                else:
                    return render_template('display.html', data=data)
            else:
                poetry_id = int(poetry_req.id.data)
                if poetry_id < 0:
                    print("Invalid id entered!")
                else:
                    data = get_user_data(poetry_id)
                    if data is None:
                        print("Failed to get user info!")
                    else:
                        return render_template('display.html', data=data)
    return render_template('index.html', poetry_form=poetry_form, poetry_req=poetry_req, line=poem_line)

















if __name__ == "__main__":
    app.run(debug=True)