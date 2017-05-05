import json
from pprint import pprint

def get():
	with open('data/data.json') as data_file:   
		data = json.load(data_file)
		return data