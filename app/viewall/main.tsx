import React, { useState } from 'react';
import { SafeAreaView, ScrollView, FlatList, StyleSheet } from 'react-native';
import Header from '../components/header';
import CategoryItem from './CategoryItem';
import ProductCard, { Product as ProductCardProduct } from '../components/_productcard';
import FilterModal from '../searchmodal/FilterModal';
import SearchFilter from '../components/searchfilter';

type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
    isFavorite: boolean;
    category: string;
};

const convertToProductCardFormat = (product: Product): ProductCardProduct => {
    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    return {
        id: product.id,
        name: product.name,
        price: numericPrice,
        originalPrice: numericPrice + 50,
        image: product.image,
        category: product.category,
        isFavorite: product.isFavorite,
        rating: 4.5,
        reviews: Math.floor(Math.random() * 500) + 50,
    };
};

const ShoppingAppScreen: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('Dress');
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedPriceRange, setSelectedPriceRange] = useState('All');
    const [selectedSize, setSelectedSize] = useState('All');
    const [selectedColor, setSelectedColor] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    const categories = ['Dress', 'Pants', 'Blazers', 'Jackets', 'Accessories'];

    const allProducts: Record<string, Product[]> = {
        Dress: [
            { id: 1, name: 'Cropped t-shirt', price: 'Rs 240.00', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROd2xMPwHkQCuaasHl6gjQKBKWAusYhOE0hg&s', isFavorite: true, category: 'Dress' },
            { id: 2, name: 'T-shirt optic white', price: 'Rs 230.00', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvJtQvKrCGxI9X3NgXRkWvwLyR0eSmirDp2A&s', isFavorite: false, category: 'Dress' },
            { id: 3, name: 'Summer Dress', price: 'Rs 180.00', image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&h=500&fit=crop&crop=top', isFavorite: false, category: 'Dress' },
            { id: 4, name: 'Evening Gown', price: 'Rs 450.00', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUkf_BkfD1WyZ9FmrZ3kOh3bzLBaXQ-WFHA&s', isFavorite: true, category: 'Dress' },
        ],
        Pants: [
            { id: 11, name: 'High Waist Jeans', price: 'Rs 120.00', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop&crop=top', isFavorite: false, category: 'Pants' },
            { id: 12, name: 'Wide Leg Pants', price: 'Rs 89.00', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEvZNH_VxHCsLjiVNyeFzMCtkzG26L5hruw&s', isFavorite: true, category: 'Pants' },
            { id: 13, name: 'Cargo Pants', price: 'Rs 95.00', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop&crop=top', isFavorite: false, category: 'Pants' },
            { id: 14, name: 'Black Trousers', price: 'Rs 140.00', image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop&crop=top', isFavorite: false, category: 'Pants' },
        ],
        Blazers: [
            {
                id: 21,
                name: 'Classic Blazer',
                price: '$280.00',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=top',
                isFavorite: true,
                category: 'Blazers',
            },
            {
                id: 22,
                name: 'Tweed Blazer',
                price: '$320.00',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBj27XIW8Z-gpW78Uo0NIWK18yqiRYDijL4Q&s',
                isFavorite: false,
                category: 'Blazers',
            },
            {
                id: 23,
                name: 'Navy Blazer',
                price: '$250.00',
                image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=500&fit=crop&crop=top',
                isFavorite: true,
                category: 'Blazers',
            },
            {
                id: 24,
                name: 'Double Breasted',
                price: '$380.00',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjbm_2XEGySB2z6fzaxqdafxb8OhLMu7eWAg&s',
                isFavorite: false,
                category: 'Blazers',
            },
        ],
        Jackets: [
            {
                id: 31,
                name: 'Denim Jacket',
                price: '$160.00',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2jFEgVGlc3LNG3UJcW2GNf9t45FXAafWmg&s',
                isFavorite: false,
                category: 'Jackets',
            },
            {
                id: 32,
                name: 'Leather Jacket',
                price: '$420.00',
                image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=500&fit=crop&crop=top',
                isFavorite: true,
                category: 'Jackets',
            },
            {
                id: 33,
                name: 'Bomber Jacket',
                price: '$180.00',
                image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop&crop=top',
                isFavorite: false,
                category: 'Jackets',
            },
            {
                id: 34,
                name: 'Winter Coat',
                price: '$300.00',
                image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=500&fit=crop&crop=top',
                isFavorite: true,
                category: 'Jackets',
            },
        ],

        Accessories: [
            {
                id: 31,
                name: 'Denim Jacket',
                price: '$160.00',
                image: 'https://kinclimg3.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BESB0292S04_YAA18DIG6XXXXXXXX_ABCD00-PICS-00004-1024-76613.png',
                isFavorite: false,
                category: 'Jackets',
            },
            {
                id: 32,
                name: 'Leather Jacket',
                price: '$420.00',
                image: 'https://kinclimg3.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BISP0076D08_YAA18PRWHPRWFXXXX_ABCD00-PICS-00004-1024-29713.png',
                isFavorite: true,
                category: 'Jackets',
            },
            {
                id: 33,
                name: 'Bomber Jacket',
                price: '$180.00',
                image: 'https://kinclimg7.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BICM0379S07_YAA18DIG6XXXXXXXX_ABCD00-PICS-00004-1024-72453.png',
                isFavorite: false,
                category: 'Jackets',
            },
            {
                id: 34,
                name: 'Winter Coat',
                price: '$300.00',
                image: 'https://kinclimg4.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIIP0427H16_YAA18DIG6XXXXXXXX_ABCD00-PICS-00004-1024-76610.png',
                isFavorite: true,
                category: 'Jackets',
            },
        ],

    };

    const priceRanges = ['All', 'Under $100', '$100 - $200', '$200 - $300', 'Above $300'];
    const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['All', 'Black', 'White', 'Blue', 'Brown', 'Gray', 'Beige'];

    const toggleFavorite = (id: string | number) => {
        const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
        setFavorites(prev => ({ ...prev, [numericId]: !prev[numericId] }));
    };


    const filteredProducts = allProducts[activeCategory]
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(p => {
            if (selectedPriceRange !== 'All') {
                const priceValue = parseFloat(p.price.replace(/[^0-9.]/g, ''));
                if (selectedPriceRange === 'Under $100' && priceValue >= 100) return false;
                if (selectedPriceRange === '$100 - $200' && (priceValue < 100 || priceValue > 200)) return false;
                if (selectedPriceRange === '$200 - $300' && (priceValue < 200 || priceValue > 300)) return false;
                if (selectedPriceRange === 'Above $300' && priceValue <= 300) return false;
            }
            return true;
        })
        .map(p => ({ ...convertToProductCardFormat(p), isFavorite: favorites[p.id] }));

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Popular" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <SearchFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeCategory={activeCategory}
                    onFilterPress={() => setFilterModalVisible(true)}
                />
                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContentContainer}>
                    {categories.map((category, index) => (
                        <CategoryItem
                            key={category}
                            category={category}
                            isActive={activeCategory === category}
                            onPress={() => setActiveCategory(category)}
                            style={{ marginRight: index === categories.length - 1 ? 0 : 12 }}
                        />
                    ))}
                </ScrollView>

                {/* Product Grid */}
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() => console.log('Product pressed:', item.name)}
                            onAddToCart={() => console.log('Add to cart:', item.name)}
                            onToggleFavorite={toggleFavorite}
                            currencySymbol="Rs"
                            showOriginalPrice
                            showFavorite
                        />
                    )}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    columnWrapperStyle={styles.productRow}
                    scrollEnabled={false}
                />
            </ScrollView>

            {/* Filter Modal */}
            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                priceRanges={priceRanges}
                sizes={sizes}
                colors={colors}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                onApply={() => setFilterModalVisible(false)}
                onReset={() => {
                    setSelectedPriceRange('All');
                    setSelectedSize('All');
                    setSelectedColor('All');
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContent: {
        paddingHorizontal: 16
    },
    categoryContentContainer: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    productRow: {
        justifyContent: 'space-between'
    },
});

export default ShoppingAppScreen;
