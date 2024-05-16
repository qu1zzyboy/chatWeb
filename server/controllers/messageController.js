import message from "../models/message";
const getMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 })
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        res.json(projectedMessages);
    } catch (err) {
        next(err)
    }
}
