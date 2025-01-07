import unittest
from app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_chain_endpoint(self):
        response = self.client.get('/chain')
        self.assertEqual(response.status_code, 200)

    def test_add_certificate(self):
        response = self.client.post('/add_certificate', json={
            'owner': 'John Doe',
            'institution': 'XYZ University',
            'certificate': 'Degree123',
        })
        self.assertEqual(response.status_code, 201)
