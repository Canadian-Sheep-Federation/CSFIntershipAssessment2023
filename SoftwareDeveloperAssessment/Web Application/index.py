from flask import Flask
from flask.ext.wtf import Form
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import Required, NumberRange
import requests

# Return requested line for a particular poem
def get_public_data(author, title, line):
    req = requests.get(url="https://poetrydb.org/title/"+title+":abs/author,linecount,lines.json")
    for i in range(len(req)):
        if req[i]["author"] == author:
            if line < int(req[i]["linecount"]):
                return req[i]["lines"][line]

app = Flask(__name__)
app.config['SECRET_KEY'] = "SomeSecretKey"

class PoetryForm(Form):
    author = StringField('Who is your favourite poetry author?', validatorss=[Required()])
    title = StringField('What is the name of your favourite poem?', validatorss=[Required()])
    line = IntegerField('Which line of the poem is your favourite?', validatorss=[Required(), NumberRange(0)])
    submit = SubmitField('Submit')

@app.route('/OtherForms', methods=['GET'])
def otherforms():

@app.route('/OtherForm/<id>', methods=['GET'])
def otherform(id):

@app.route('/UserForm/', methods=['GET'])
def userform():


@app.route('/', methods=['GET', 'POST'])
def index():
    form = PoetryForm()
    poem_line = ""
    if request.method == 'POST':
        if form.validate_on_submit():
            author = form.author.data
            title = form.title.data
            line = form.line.data
            poem_line = get_public_data(author, title, line)
    return render_template('index.html', form=form, line=poem_line)

















if __name__ == "__main__":
    app.run(debug=True)