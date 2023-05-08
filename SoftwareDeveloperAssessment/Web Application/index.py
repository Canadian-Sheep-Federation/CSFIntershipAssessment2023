from flask import Flask
from flask.ext.wtf import Form
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import Required, NumberRange

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

@app.route('/UserForm/', methods=['POST'])
def userform():


@app.route('/', methods=['GET', 'POST'])
def index():
    form = PoetryForm()
    if request.method == 'GET':
        return render_template('index.html', form=form)
    else:
        if poetry_form.validate_on_submit():
            














if __name__ == "__main__":
    app.run(debug=True)