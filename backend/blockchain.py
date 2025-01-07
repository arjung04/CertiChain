import hashlib
import json
from time import time

class Blockchain:
    def __init__(self):
        self.chain = []
        self.current_data = []
        # Create the genesis block
        self.new_block(previous_hash='1', proof=100)
        print("Genesis block created.")

    def new_block(self, proof, previous_hash=None):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'data': self.current_data,
            'proof': proof,
            'previous_hash': previous_hash or (self.hash(self.chain[-1]) if self.chain else None),
        }
        self.current_data = []
        self.chain.append(block)
        print(f"New block created: {block['index']}")
        return block

    def new_record(self, owner, institution, certificate):
        if not all([owner, institution, certificate]):
            raise ValueError("All fields (owner, institution, certificate) must be provided.")
        self.current_data.append({
            'owner': owner,
            'institution': institution,
            'certificate': certificate,
        })
        print(f"New record added: {self.current_data[-1]}")
        return self.last_block['index'] + 1

    @staticmethod
    def hash(block):
        try:
            block_string = json.dumps(block, sort_keys=True).encode()
        except (TypeError, ValueError) as e:
            raise ValueError(f"Error hashing block: {e}")
        return hashlib.sha256(block_string).hexdigest()

    @property
    def last_block(self):
        if not self.chain:
            raise ValueError("Blockchain is empty.")
        return self.chain[-1]

    def proof_of_work(self, last_proof):
        proof = 0
        max_iterations = 1e6
        while not self.valid_proof(last_proof, proof):
            if proof > max_iterations:
                raise ValueError("Proof of Work took too long.")
            if proof % 10000 == 0:
                print(f"Proof of Work attempt: {proof}")
            proof += 1
        return proof

    @staticmethod
    def valid_proof(last_proof, proof, difficulty=4):
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:difficulty] == "0" * difficulty
