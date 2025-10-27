import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, Dimensions } from 'react-native';
// import { ArrowLeft02Icon, ShoppingBag03Icon, ShoppingCart01Icon, Category02Icon, Tag01Icon, Invoice03Icon } from 'hugeicons-react-native';
import Button from '../../components/Buttons/Button';
import Counter from '../../components/Buttons/Counter';

const { width } = Dimensions.get('window');

const ProductCard = ({ image, title, rating, price, onAddToCart }) => {
  return (
    <View className="w-40 mr-4">
      <Image 
        source={{ uri: image }}
        className="w-full h-40 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="text-text1 font-poppinsMedium text-sm mb-1" numberOfLines={1}>
        {title}
      </Text>
      <View className="flex-row items-center mb-2">
        <Text className="text-secondary text-xs mr-1">★★★★★</Text>
        <Text className="text-text2 text-xs">{rating}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-text1 font-poppinsMedium text-base">₹{price}</Text>
        <TouchableOpacity 
          onPress={onAddToCart}
          className="bg-primary px-3 py-1.5 rounded-md"
        >
          <Text className="text-white font-poppins text-xs">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Details = () => {
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data - replace with actual data from route params
  const product = {
    id: 1,
    name: 'Rudraksha',
    description: 'Book your palm reading today and take a step closer to clarity.',
    price: 3520,
    category: 'Amulets',
    tags: ['Esoterics', 'Simple', 'Talisman'],
    productId: '256458',
    image: 'https://images.unsplash.com/photo-1582719366330-e02e836e5d55?w=800',
    rating: 4.5,
    longDescription: 'Dicta sunt explicabo. Nemo enim ipsam voluptatem voluptas sit odit aut fugit, sed quia consequuntur. Lorem ipsum dolor. Aquia sit amet, elitr, sed diam nonum eirmod tempor invidunt labore et dolore magna aliquam.erat, sed diam voluptua. At vero accusam et justo duo dolores et ea rebum. Stet clita in vidunt ut labore eirmod tempor invidunt magna aliquam.',
    additionalInfo: 'Dicta sunt explicabo. Nemo enim ipsam voluptatem voluptas sit odit aut fugit, sed quia consequuntur. Lorem ipsum dolor. Aquia sit amet, elitr, sed diam nonum eirmod tempor invidunt labore et dolore magna aliquam.erat, sed diam voluptua. At vero accusam et justo duo dolores et ea rebum. Stet clita in vidunt ut labore eirmod tempor invidunt magna aliquam.',
  };

  const relatedProducts = [
    { id: 1, title: 'Bracelets', rating: '4.5', price: 3520, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
    { id: 2, title: 'Yantras', rating: '4.8', price: 3520, image: 'https://images.unsplash.com/photo-1582719366330-e02e836e5d55?w=400' },
    { id: 3, title: 'Crystals', rating: '4.6', price: 2800, image: 'https://images.unsplash.com/photo-1582719366330-e02e836e5d55?w=400' },
  ];

  const handleAddToCart = () => {
    console.log('Add to cart:', { product, quantity });
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { product, quantity });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View className="relative">
          <Image 
            source={{ uri: product.image }}
            style={{ width: width, height: width * 1.2 }}
            resizeMode="cover"
          />
          
          {/* Gradient Overlay */}
          <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          
          {/* Back Button */}
          <TouchableOpacity 
            // onPress={() => navigation.goBack()}
            className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-xl items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            {/* <ArrowLeft02Icon size={24} color="#FFFFFF" /> */}
          </TouchableOpacity>

          {/* Product Title on Image */}
          <View className="absolute bottom-6 left-6 right-6">
            <Text className="text-white font-poppinsMedium text-3xl mb-2">
              {product.name}
            </Text>
            <Text className="text-white/90 font-poppins text-sm leading-5">
              {product.description}
            </Text>
          </View>
        </View>

        {/* Product Details Section */}
        <View className="bg-background px-6 py-6">
          {/* Price */}
          <Text className="text-primary font-poppinsMedium text-3xl mb-6">
            ₹{product.price}
          </Text>

          {/* Category */}
          <View className="flex-row items-center mb-3">
            {/* <Category02Icon size={20} color="#62748E" /> */}
            <Text className="text-text2 font-poppins text-sm ml-2">
              Category: <Text className="text-text1 font-poppinsMedium">{product.category}</Text>
            </Text>
          </View>

          {/* Tags */}
          <View className="flex-row items-start mb-3">
            {/* <Tag01Icon size={20} color="#62748E" className="mt-1" /> */}
            <View className="flex-1 ml-2">
              <Text className="text-text2 font-poppins text-sm">
                Tags: <Text className="text-text1 font-poppinsMedium">{product.tags.join(', ')}</Text>
              </Text>
            </View>
          </View>

          {/* Product ID */}
          <View className="flex-row items-center mb-6">
            {/* <Invoice03Icon size={20} color="#62748E" /> */}
            <Text className="text-text2 font-poppins text-sm ml-2">
              Product ID: <Text className="text-text1 font-poppinsMedium">{product.productId}</Text>
            </Text>
          </View>

          {/* Counter */}
          <View className="mb-6">
            <Counter 
              count={quantity}
              onIncrement={() => setQuantity(quantity + 1)}
              onDecrement={() => setQuantity(quantity - 1)}
            />
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-text1 font-poppinsMedium text-lg mb-3">
              Description
            </Text>
            <Text className="text-text2 font-poppins text-sm leading-6">
              {product.longDescription}
            </Text>
          </View>

          {/* Additional Information */}
          <View className="mb-6">
            <Text className="text-text1 font-poppinsMedium text-lg mb-3">
              Additional Information
            </Text>
            <Text className="text-text2 font-poppins text-sm leading-6">
              {product.additionalInfo}
            </Text>
          </View>

          {/* Related Products */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-text1 font-poppinsMedium text-lg">
                Related Products
              </Text>
              <TouchableOpacity>
                <Text className="text-primary font-poppinsMedium text-sm">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 24 }}
            >
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                  onAddToCart={() => console.log('Add to cart:', item.id)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="bg-white px-6 py-4 border-t border-gray-200" 
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <View className="flex-row items-center" style={{ gap: 12 }}>
          <View className="flex-1">
            <Button
              title="Buy Now"
              onPress={handleBuyNow}
              variant="primary"
              size="large"
              containerStyle="flex-row items-center justify-center"
            >
              {/* <ShoppingBag03Icon size={20} color="#FFFFFF" className="mr-2" /> */}
            </Button>
          </View>
          
          <View className="flex-1">
            <Button
              title="Add to Cart"
              onPress={handleAddToCart}
              variant="outline"
              size="large"
              containerStyle="border-2 border-text1 bg-transparent"
              textStyle="text-text1"
            >
              {/* <ShoppingCart01Icon size={20} color="#1D293D" className="mr-2" /> */}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;