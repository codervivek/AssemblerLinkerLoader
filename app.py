import os
from flask import *
import main

app = Flask(__name__)

@app.route('/')
def searchpage():
	return render_template('index.html')

@app.route('/load_ajax2', methods=["GET", "POST"])
def load_ajax2():
	if request.method == "POST":
		print("Hi this is also kapil goyal")
		data2 =  request.get_json()
		print(data2)
		with open("my_file.txt", 'w+') as f:
			f.write(data2)
		print(data2)

		data =  {'files': ['my_file.txt']}
		fileNames = data['files']
		fileNames = [str(i) for i in fileNames]
		filedata = {}
		for file in fileNames:
			with open(file, 'r') as f:
				filedata[file] = f.read()
		main.x = fileNames
		main.runass()
		main.runlin()
		symTable = main.getSymTable()
		globTable = main.getGlobTable()
		linesNo = main.getLineNumber()
		extTable = main.getExtTable()
		litTable = main.getLitTable()
		# print("LITTAB", litTable)
		# print("SYMTAB", symTable)
		# print("GLOBTABLE", globTable)

		pass1 = {}
		pass2 = {}
		code={}
		iftable = main.getifTable()
		for file in fileNames:
			fullFile=file
			file = file.split('.')[0]
			with open(file+'.pass1') as f:
				pass1[file] = f.read()
				temp=""
				currentCode=""
				currentFiledata=filedata[fullFile].split("\n")
				for i,line in enumerate(pass1[file].split("\n")):
					if(i in linesNo):
						currentCode+="------------------------\n"
						temp+="------------------------\n"
						currentCode+=currentFiledata[linesNo[i]]+"\n"
					else:
						currentCode+="\n"
					temp+=str(i+1)+": "+line+"\n"
				pass1[file]=temp
				code[file]=currentCode
			with open(file+'.pass2') as f:
				pass2[file] = f.read()
		with open(fileNames[0].split('.')[0]+'.linked') as f:
			lin = f.read()
	return json.dumps({'lineNumber' : linesNo,'code':code,'status':'OK' ,'pass1':pass1, 'pass2':pass2, 'lin':lin, 'symTable':symTable, 'globTable':globTable, 'extTable':extTable , 'ifTable': iftable, 'filedata':filedata, 'litTable':litTable})


@app.route('/load_ajax', methods=["GET", "POST"])
def load_ajax():
	if request.method == "POST":
		data =  request.get_json()
		fileNames = data['files']
		fileNames = [str(i) for i in fileNames]
		filedata = {}
		for file in fileNames:
			with open(file, 'r') as f:
				filedata[file] = f.read()
		# print(fileNames)
		# print(data)
		# print("This is tatti")
		main.x = fileNames
		main.runass()
		main.runlin()
		symTable = main.getSymTable()
		globTable = main.getGlobTable()
		linesNo = main.getLineNumber()
		extTable = main.getExtTable()
		litTable = main.getLitTable()
		# print("LITTAB", litTable)
		# print("SYMTAB", symTable)
		# print("GLOBTABLE", globTable)

		pass1 = {}
		pass2 = {}
		code={}
		iftable = main.getifTable()
		for file in fileNames:
			fullFile=file
			file = file.split('.')[0]
			with open(file+'.pass1') as f:
				pass1[file] = f.read()
				temp=""
				currentCode=""
				currentFiledata=filedata[fullFile].split("\n")
				for i,line in enumerate(pass1[file].split("\n")):
					if(i in linesNo):
						currentCode+="------------------------\n"
						temp+="------------------------\n"
						currentCode+=currentFiledata[linesNo[i]]+"\n"
					else:
						currentCode+="\n"
					temp+=str(i+1)+": "+line+"\n"
				pass1[file]=temp
				code[file]=currentCode
			with open(file+'.pass2') as f:
				pass2[file] = f.read()
		with open(fileNames[0].split('.')[0]+'.linked') as f:
			lin = f.read()
	return json.dumps({'lineNumber' : linesNo,'code':code,'status':'OK' ,'pass1':pass1, 'pass2':pass2, 'lin':lin, 'symTable':symTable, 'globTable':globTable, 'extTable':extTable , 'ifTable': iftable, 'filedata':filedata, 'litTable':litTable})

@app.route('/loadSimulator', methods=["GET", "POST"])
def loadSimulator():
	if request.method == "POST":
		main.resetAll()
		data = request.get_json()
		fileName = data['file']
		offset = data['offset']
		main.runload(int(offset))
		fileName = fileName+'.loaded'
		# print(fileName)
		main.runloader(fileName, offset)
		reg = main.getRegisters()
		memory = main.getMemlocs()
		memoryData = main.getMemData()
		stack = main.getStack()
		# print("ASDFASDFASFDASFDSFAFDASFASDF", memoryData)
		return json.dumps({'status':'OK', 'reg':reg, 'memory':memory , 'memoryData':memoryData, 'stack':stack})


@app.route('/runSimulator', methods=["GET", "POST"])
def runSimulator():
	if request.method == "POST":
		main.runSimulator()
		reg = main.getRegisters()
		memory = main.getMemlocs()
		memoryData = main.getMemData()
		stack = main.getStack()
		print("STACK : ", stack)
		return json.dumps({'status':'OK', 'reg':reg, 'memory':memory, 'memoryData':memoryData, 'stack':stack})

if __name__=="__main__":
	app.run(host='0.0.0.0', debug=True)
