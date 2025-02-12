from flask import Flask, jsonify, request
from blockchain import Blockchain

app = Flask(__name__)
blockchain = Blockchain()

@app.route('/add_certificate', methods=['POST'])
def add_certificate():
    values = request.get_json(silent=True)
    if not values:
        return jsonify({'error': 'Invalid JSON payload'}), 400

    required = ['owner', 'institution', 'certificate']
    if not all(k in values for k in required):
        return jsonify({'error': 'Missing values'}), 400

    index = blockchain.new_record(values['owner'], values['institution'], values['certificate'])
    return jsonify({'message': f'Certificate will be added to Block {index}'}), 201

@app.route('/mine', methods=['GET'])
def mine():
    last_proof = blockchain.last_block['proof']
    proof = blockchain.proof_of_work(last_proof)
    previous_hash = blockchain.hash(blockchain.last_block)
    block = blockchain.new_block(proof, previous_hash)
    return jsonify({
        'message': 'New block mined!',
        'block': block
    }), 200

@app.route('/chain', methods=['GET'])
def full_chain():
    return jsonify({
        'chain': blockchain.chain,
        'length': len(blockchain.chain)
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
