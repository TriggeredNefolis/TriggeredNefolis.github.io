import requests
import sys
import json
from datetime import datetime
import uuid

class GamePortAPITester:
    def __init__(self, base_url="https://gameport-nepal.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.cart_id = f"test-cart-{uuid.uuid4().hex[:8]}"
        self.test_product_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list) and len(response_data) > 0:
                        print(f"   Response: Found {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root endpoint"""
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_get_products(self):
        """Test getting all products"""
        success, response = self.run_test(
            "Get All Products",
            "GET",
            "api/products",
            200
        )
        if success and response:
            if len(response) > 0:
                self.test_product_id = response[0].get('id')
                print(f"   Found {len(response)} products")
                print(f"   Sample product: {response[0].get('name', 'Unknown')}")
            else:
                print("   Warning: No products found")
        return success

    def test_get_single_product(self):
        """Test getting a single product"""
        if not self.test_product_id:
            print("❌ Skipping single product test - no product ID available")
            return False
            
        success, response = self.run_test(
            "Get Single Product",
            "GET",
            f"api/products/{self.test_product_id}",
            200
        )
        return success

    def test_get_cart(self):
        """Test getting cart (should create new if doesn't exist)"""
        success, response = self.run_test(
            "Get Cart",
            "GET",
            f"api/cart/{self.cart_id}",
            200
        )
        if success:
            print(f"   Cart items: {len(response.get('items', []))}")
            print(f"   Cart total: Rs. {response.get('total', 0)}")
        return success

    def test_add_to_cart(self):
        """Test adding item to cart"""
        if not self.test_product_id:
            print("❌ Skipping add to cart test - no product ID available")
            return False
            
        success, response = self.run_test(
            "Add to Cart",
            "POST",
            f"api/cart/{self.cart_id}/add",
            200,
            data={"product_id": self.test_product_id, "quantity": 2}
        )
        if success:
            print(f"   Cart items after add: {len(response.get('items', []))}")
            print(f"   Cart total after add: Rs. {response.get('total', 0)}")
        return success

    def test_remove_from_cart(self):
        """Test removing item from cart"""
        if not self.test_product_id:
            print("❌ Skipping remove from cart test - no product ID available")
            return False
            
        success, response = self.run_test(
            "Remove from Cart",
            "DELETE",
            f"api/cart/{self.cart_id}/remove/{self.test_product_id}",
            200
        )
        if success:
            print(f"   Cart items after remove: {len(response.get('items', []))}")
            print(f"   Cart total after remove: Rs. {response.get('total', 0)}")
        return success

    def test_create_order(self):
        """Test creating an order"""
        # First add an item to cart
        if not self.test_product_id:
            print("❌ Skipping order test - no product ID available")
            return False
            
        # Add item to cart first
        add_success, cart_response = self.run_test(
            "Add to Cart for Order",
            "POST",
            f"api/cart/{self.cart_id}/add",
            200,
            data={"product_id": self.test_product_id, "quantity": 1}
        )
        
        if not add_success:
            print("❌ Failed to add item to cart for order test")
            return False

        # Create order
        order_data = {
            "customer_name": "Test Customer",
            "customer_email": "test@gameportnepal.com",
            "customer_phone": "9841234567",
            "customer_address": "Test Address, Kathmandu, Nepal",
            "items": cart_response.get('items', []),
            "total": cart_response.get('total', 0),
            "notes": "Test order from backend testing"
        }
        
        success, response = self.run_test(
            "Create Order",
            "POST",
            "api/orders",
            200,
            data=order_data
        )
        
        if success:
            print(f"   Order ID: {response.get('order_id', 'Unknown')}")
            print(f"   Success: {response.get('success', False)}")
            print(f"   Message: {response.get('message', 'No message')}")
            return response.get('order_id')
        return False

    def test_get_order(self, order_id):
        """Test getting an order by ID"""
        if not order_id:
            print("❌ Skipping get order test - no order ID available")
            return False
            
        success, response = self.run_test(
            "Get Order",
            "GET",
            f"api/orders/{order_id}",
            200
        )
        if success:
            print(f"   Order status: {response.get('status', 'Unknown')}")
            print(f"   Customer: {response.get('customer_name', 'Unknown')}")
        return success

def main():
    print("🎮 GamePort Nepal API Testing Suite")
    print("=" * 50)
    
    # Setup
    tester = GamePortAPITester()
    
    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Basic connectivity
    tester.test_root_endpoint()
    
    # Product tests
    tester.test_get_products()
    tester.test_get_single_product()
    
    # Cart tests
    tester.test_get_cart()
    tester.test_add_to_cart()
    tester.test_remove_from_cart()
    
    # Order tests
    order_id = tester.test_create_order()
    if order_id:
        tester.test_get_order(order_id)

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())