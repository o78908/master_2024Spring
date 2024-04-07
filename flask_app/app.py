from flask import Flask, jsonify,request, render_template

stores = [{
    'name': "Elton's first store",
    'items': [{'name':'my item 1', 'price': 30 }],
    },
    {
    'name': "Elton's second store",
    'items': [{'name':'my item 2', 'price': 15 }],
    },
]


app = Flask(__name__)
@app.route('/')
def home():
    return "Hello World"

#get /store
@app.route('/store', methods=['GET'])
def get_stores():
    return jsonify(stores)

@app.route('/store', methods=['POST'])
def create_store():
    request_data = request.get_json()
    new_store = {
        'name': request_data['name'],
        'items': request_data['items'] if 'items' in request_data else []
    }
    stores.append(new_store)
    return jsonify(stores)
    


@app.route('/store/<string:name>')
def get_store(name):
    for store in stores:
        if store['name'] == name:
            return jsonify(store)
        return jsonify ({'message': 'store not found'})
    
#get /store/<name>/item data: {name :}
@app.route('/store/<string:name>/item')
def get_item_in_store(name):
    for store in stores:
        if store['name'] == name:
            return jsonify( {'items':store['items'] } )
    return jsonify ({'message':'store not found'})

# app.run(port=5000, debug=True)

app.run(host='0.0.0.0',port=5000 ,debug=False)