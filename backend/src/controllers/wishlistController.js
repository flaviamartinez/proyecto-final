import { addWishlistModel, deleteWishlistModel } from '../models/wishlistModel.js'

export const addWishlist = async (req, res) => {
  const { productId, userId } = req.body
  const wishlist = await addWishlistModel({ productId, userId })
  return res.status(201).json({
    success: true,
    message: 'Product agregado a la wishlist exitosamente',
    data: { wishlist }
  })
}

export const deleteWishlist = async (req, res) => {
  const { productId, userId } = req.body
  const wishlist = await deleteWishlistModel({ productId, userId })
  return res.status(201).json({
    success: true,
    message: 'Product eliminado de la wishlist exitosamente',
    data: { wishlist }
  })
}
