import os

# bash command to convert ipynb to py
os.system('jupyter nbconvert --to script ./fashion-classifier.ipynb')

# save the tensorflow model to a file
with open('./fashion-classifier.py', 'a') as file:
    file.write('\nmodel.save(\'./\')')

# create a requirements.txt file to pack the dependencies
os.system('pip3 freeze > requirements.txt')

# unpack requirements.txt
os.system('pip3 install -r requirements.txt')

# run the model
os.system('python3 fashion-classifier.py')

# create a new python file to test the saved model
with open('./test.py', 'w') as file:
    file.write('''
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras

# load the model
model = keras.models.load_model('./')

# load the dataset
fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# normalize the data
train_images = train_images / 255.0
test_images = test_images / 255.0

# create a list of class names
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
                'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

# make predictions
predictions = model.predict(test_images)

# print the first prediction
print(predictions[0])

# print the class name of the first prediction
print(class_names[np.argmax(predictions[0])])

# print the actual class name
print(class_names[test_labels[0]])

# plot the first image
plt.figure()
plt.imshow(test_images[0])
plt.colorbar()
plt.grid(False)
plt.show()
''')
os.system('python3 test.py')
