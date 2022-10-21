
const Sauce = require('../models/Sauce');

exports.likeDislikeSauce = (req, res) => { 

  Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			//mise en place d'un switch pour traiter les 3 cas possibles de like/dislike

			switch (req.body.like) {
				case 1: //si le tableau usersLiked ne contient pas ce userId ET que le likes vaut 1
					if (
						!sauce.usersLiked.includes(req.body.userId) &&
						req.body.like === 1
					) {

						//Mise à jour de la base MongoDB

						Sauce.updateOne(
							{ _id: req.params.id },
							{
								$inc: { likes: 1 },
								$push: { usersLiked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "like vaut 1 !" }))
							.catch((error) => res.status(400).json({ error }));
					}
					break;

				//si le tableau usersDisliked ne contient pas ce userId ET que le dislikes vaut -1

				case -1: //like = -1 (vote négatif, dislikes = 1 )
					if (
						!sauce.usersDisliked.includes(req.body.userId) &&
						req.body.like === -1
					) {

						//Mise à jour de la base MongoDB

						Sauce.updateOne(
							{ _id: req.params.id },
							{
								$inc: { dislikes: 1 }, //si la valeur du like vaut -1, on incrémente dislikes de 1
								$push: { usersDisliked: req.body.userId },
							}
						)
							.then(() =>
								res.status(201).json({ message: "dislike vaut -1 !" })
							)
							.catch((error) => res.status(400).json({ error }));
					}
					break;

				case 0:
					//si le tableau usersLiked contient ce userId ET que le likes vaut 0

					if (sauce.usersLiked.includes(req.body.userId)) {

						//Mise à jour de la base MongoDB

						Sauce.updateOne(
							{ _id: req.params.id },
							{
								$inc: { likes: -1 }, //si la valeur du like vaut 0, on incrémente de -1
								$pull: { usersLiked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "like vaut 0 !" }))
							.catch((error) => res.status(400).json({ error }));
					}

					//si le tableau usersLiked contient ce userId ET que le dislikes vaut 0

					if (sauce.usersDisliked.includes(req.body.userId)) {

						//Mise à jour de la base MongoDB

						Sauce.updateOne(
							{ _id: req.params.id },
							{
								$inc: { dislikes: -1 }, //si la valeur du like vaut 0, on incrémente de -1
								$pull: { usersDisliked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "dislike vaut 0 !" }))
							.catch((error) => res.status(400).json({ error }));
					}
			}
		})
		.catch((error) => res.status(400).json({ error }));

    

  };
