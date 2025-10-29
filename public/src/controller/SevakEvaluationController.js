const path = require('path');
const Model = require('../model/SevakEvaluationModel.js');
const viewsPath = path.join(__dirname, '..', 'view', 'Exam');

// Serve the main HTML page
exports.getSevakEvaluationPage = (req, res) => {
    res.sendFile(path.join(viewsPath, 'SevakEvaluation', 'list.html'));
};

exports.addSevakEvaluationPage = (req, res) => {
    res.sendFile(path.join(viewsPath, 'SevakEvaluation', 'add.html'));
}


