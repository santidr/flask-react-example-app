from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pyreactdb'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.sites

@app.route('/sites', methods=['POST'])
def create_site():
    db.insert_one({
        'sitename': request.json['sitename'],
        'siteurl': request.json['siteurl'],
        'username': request.json['username']
    })
    return jsonify({'msg': 'site created'})

@app.route('/sites', methods=['GET'])
def get_sites():
    sites = []
    for doc in db.find():
        sites.append({
            '_id': str(ObjectId(doc['_id'])),
            'sitename': doc['sitename'],
            'siteurl': doc['siteurl'],
            'username': doc['username']
        })
    return jsonify(sites)

@app.route('/sites/<id>', methods=['GET'])
def get_one_site(id):
    site = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(site['_id'])),
        'sitename': site['sitename'],
        'siteurl': site['siteurl'],
        'username': site['username']
    })

@app.route('/sites/<id>', methods=['DELETE'])
def delete_site(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'site deleted'})

@app.route('/sites/<id>', methods=['PUT'])
def update_site(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'sitename': request.json['sitename'],
        'siteurl': request.json['siteurl'],
        'username': request.json['username']
    }})
    return jsonify({'msg': 'site updated'})


if __name__ == '__main__':
    app.run(debug=True)