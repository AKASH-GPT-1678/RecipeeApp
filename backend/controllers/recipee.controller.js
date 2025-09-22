import { date } from "drizzle-orm/pg-core";
import { db } from "../configs/db.js"
import { favoritesTable } from "../models/schema.js";
import { and, eq } from "drizzle-orm";

async function addTofavourites(req, res) {


    try {
        const { userId, recipeId, title, image, cookTime, servings } = req.body;
        if (!userId || !recipeId || !title) {
            return res.status(400).json({
                success: false,
                message: "Required fields are not provided",
                missing: {
                    userId: !userId,
                    recipeId: !recipeId,
                    title: !title,

                }
            });
        };

        const newFavorite = await db.insert(favoritesTable).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
        })
            .returning()


            ;

        res.status(200).json({ message: "Created", data: newFavorite });




    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error, error: "Internal Server Errpr" })

    }

};
async function deleteFromFavourites(req, res) {
    try {
        const { userId, recipeId } = req.params;

        // Validation
        if (!userId || !recipeId) {
            return res.status(400).json({
                success: false,
                message: "Required params are not provided",
                missing: {
                    userId: !userId,
                    recipeId: !recipeId
                }
            });
        }

        // Delete record
        const deletedFavorite = await db
            .delete(favoritesTable)
            .where(
                and(
                    eq(favoritesTable.userId, userId),
                    eq(favoritesTable.recipeId, Number(recipeId))
                )
            )
            .returning();

        // If nothing was deleted
        if (deletedFavorite.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No favorite found for given userId and recipeId"
            });
        }

        // Success
        res.status(200).json({
            success: true,
            message: "Deleted successfully",
            data: deletedFavorite
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

async function getFavourites(req, res) {
    try {
        const { userId } = req.params;

        // Validation
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required in params"
            });
        }

        // Query
        const favourites = await db
            .select()
            .from(favoritesTable)
            .where(eq(favoritesTable.userId, userId));

        if (favourites.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No favourites found for this userId"
            });
        }

        // Success
        res.status(200).json({
            success: true,
            count: favourites.length,
            data: favourites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export { addTofavourites, deleteFromFavourites ,getFavourites};