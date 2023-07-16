const {Conversation, Message} = require("../database");

module.exports = {

    newConversation: async (req, res, next) => {
        try {

            console.log(req.body)

            const newConversation = new Conversation({
                members: [req.body.senderId, req.body.receiverId],
            });

            console.log(newConversation)

            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);

        } catch (e) {
            next(e)
        }
    },

    getCurrentConversation: async (req, res, next) => {
        try {

            console.log(req.params)

            const conversation = await Conversation.find({
                members: { $in: [req.params.user_id] },
            });


            console.log(conversation)
            res.status(200).json(conversation);
        } catch (e) {
            next(e)
        }
    },

    getConversationWithUsers: async (req, res, next) => {
        try {

            const conversation = await Conversation.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            });
            res.status(200).json(conversation)

        } catch (e) {
            next(e)
        }
    },

    addMessage: async (req, res, next) => {
        try {
            const newMessage = new Message(req.body);

            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage);

        } catch (e) {
            next(e)
        }
    },

    getMessage: async (req, res, next) => {
        try {

            const messages = await Message.find({
                conversationId: req.params.conversationId,
            });
            res.status(200).json(messages);
        } catch (e) {
            next(e)
        }
    },

}