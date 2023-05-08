from flask import Flask, request, render_template
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, SubmitField
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
    poetry_id = rep["id"]
    author = rep["author"]
    title = rep["title"]
    line = rep["line"]
    return [(poetry_id, author, title, line)]

# Get all User data in the backend
def get_all_user_data():
    rep = requests.get(url="http://localhost:3000/")
    if rep.status_code != 200:
        return None
    rep = rep.json()
    data = []
    for i in range(len(rep)):
        poetry_id = rep["id"]
        author = rep["author"]
        title = rep["title"]
        line = rep["line"]
        data.append((poetry_id, author, title, line))
    return data

app = Flask(__name__)
app.config['SECRET_KEY'] = "SomeSecretKey"
bootstrap = Bootstrap(app)

class PoetryForm(FlaskForm):
    author = StringField('Who is your favourite poetry author?')
    title = StringField('What is the name of your favourite poem?')
    line = IntegerField('Which line of the poem is your favourite?')
    submit = SubmitField('Submit')

class PoetryRequest(FlaskForm):
    id = IntegerField('Which form id would you like to see? (Leave blank to view all)')
    submit = SubmitField('Submit')

@app.route('/', methods=['GET', 'POST'])
def index():
    poetry_form = PoetryForm()
    poetry_req = PoetryRequest()
    poem_line = None
    if request.method == 'POST':
        if poetry_form.submit.data and poetry_form.validate():
            author = poetry_form.author.data
            title = poetry_form.title.data
            line = poetry_form.line.data
            success = store_user_data(author, title, line)
            if success is None:
                print("Failed to store user info!")
            poem_line = get_public_data(author, title, line)
            if poem_line is None:
                print("Poem not found from public api!")
        if poetry_req.submit.data:
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