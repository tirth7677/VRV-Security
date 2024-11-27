const getAdminContent = (req, res) => {
    res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {
            content: 'Welcome Admin!',
        },
    });
};

const getUserContent = (req, res) => {
    res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {
            content: 'Welcome User!',
        },
    });
};

const getModeratorContent = (req, res) => {
    res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {
            content: 'Welcome Moderator!',
        },
    });
};

module.exports = { getAdminContent, getUserContent, getModeratorContent };
