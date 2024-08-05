document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartModal = document.querySelector('.cart-modal');
    const cartButton = document.querySelector('.cart-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout');

    const updateCartCount = () => {
        cartCountElement.textContent = cart.length;
    };

    const updateCartTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalContainer.textContent = `ยอดรวม: ${total} บาท`;
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <p>${item.name}</p>
                <p>${item.price} บาท</p>
                <p>จำนวน: ${item.quantity}</p>
                <span class="remove-item" data-index="${index}">ลบ</span>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                renderCartItems();
                updateCartTotal();
                updateCartCount();
            });
        });
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const foodItem = event.target.closest('.food-item');
            const id = foodItem.dataset.id;
            const name = foodItem.dataset.name;
            const price = parseFloat(foodItem.dataset.price);

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCartCount();
        });
    });

    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCartItems();
        updateCartTotal();
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('ตะกร้าสินค้าว่างเปล่า!');
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`สั่งซื้อสินค้าเรียบร้อย! ยอดรวม: ${total} บาท`);

        // Reset cart
        cart.length = 0;
        renderCartItems();
        updateCartTotal();
        updateCartCount();
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});
