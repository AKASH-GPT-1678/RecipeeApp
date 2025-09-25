import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { homeStyles } from "../../assets/styles/home.styles"
import { MEALAPI } from "../../services/mealApi";
import { Image } from 'expo-image';
import CategoryFilter from '@/components/categoryfilter';
interface Category {
    strCategory: string;
    strCategoryThumb: string;
    description: string;
}


const HomeScreen = () => {
    const router = useRouter();
    const [selectedCatgegory, setSelectedCategories] = React.useState(null);
    const [recipes, setRecipes] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [featuredRecipee, setFeaturedRecipee] = React.useState<any | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const [apiCategories, randomMeals, featuredMeals] = await Promise.all([
                MEALAPI.getCategories(),
                MEALAPI.getRandomMeals(12),
                MEALAPI.getRandomMeal()
            ]);

            const transformedCategories = apiCategories.map((cat: Category, index: number) => ({
                id: index + 1,
                name: cat.strCategory,
                image: cat.strCategoryThumb,
                description: cat.description



            }));
            setCategories(transformedCategories);
            const transformedMeals = randomMeals
                .map((meal: any) => MEALAPI.transformMealData(meal))
                .filter((meal: any) => meal != null);

            setRecipes(transformedMeals);



            const transformedFeatured = MEALAPI.transformMealData(featuredMeals);
            setFeaturedRecipee(transformedFeatured)



        } catch (error) {

        }

    };

    const loadCategoryData = async (category: any) => {
        try {
            const meals = await MEALAPI.filterByCategory(category);
            const tranformedMeals = meals
                .map((meal: any) => MEALAPI.transformMealData(meal))
                .filter((meal: any) => meal !== null)
            setRecipes(tranformedMeals)

        } catch (error) {

        }
    };


    React.useEffect(() => {
        loadData();


    }, [])

    return (
        <View style={homeStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                // refreshControl={() => { }}
                contentContainerStyle={homeStyles.scrollContent}

            >
                <View style={homeStyles.welcomeSection}>
                    <Image
                        source={require("../../assets/images/lamb.png")}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />
                    <Image
                        source={require("../../assets/images/lamb.png")}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />

                    <Image
                        source={require("../../assets/images/pork.png")}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />


                </View>

                {
                    featuredRecipee &&
                    <View style={homeStyles.featuredSection}>
                        <TouchableOpacity
                            style={homeStyles.featuredCard}
                            activeOpacity={0.9}
                            onPress={() => router.push(`/`)}


                        >
                            <View
                                style={homeStyles.featuredImageContainer}

                            >
                                {/* <Image
                                    source={{ url: featuredRecipee.image as string }}
                                    style={homeStyles.featuredImage}
                                    contentFit='cover'
                                    transition={500}


                                /> */}
                                <View style={homeStyles.featuredOverlay}>
                                    <View style={homeStyles.featuredBadge}>
                                        <Text style={homeStyles.featuredBadgeText}>
                                            Featured

                                        </Text>

                                    </View>

                                </View>

                            </View>

                        </TouchableOpacity>

                    </View>
                }


                {


                    categories.length > 0 && (
                        <CategoryFilter 
                        
                        />
    
)
                }

            </ScrollView>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})