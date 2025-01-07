import unittest
from blockchain import Blockchain

class TestBlockchain(unittest.TestCase):
    def setUp(self):
        self.blockchain = Blockchain()

    def test_initial_block(self):
        self.assertEqual(len(self.blockchain.chain), 1)

    def test_new_block(self):
        block = self.blockchain.new_block(proof=123, previous_hash='abc')
        self.assertEqual(block['index'], 2)

    def test_new_record(self):
        index = self.blockchain.new_record('John Doe', 'XYZ University', 'Degree123')
        self.assertEqual(index, 2)
