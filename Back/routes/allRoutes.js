const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })
const catchAsync = require('../utils/catchAsync');
const errorHandler = require('../utils/errorHandler');
const PatientController = require('../controllers/patient.controllers');
const DoctorController = require('../controllers/doctor.controllers');
const ReportController = require('../controllers/report.controllers');
const DrugController = require('../controllers/drug.controllers');
const OperationController = require('../controllers/operation.controllers');
const AnalysisController = require('../controllers/analysis.controllers');
const ReviewController = require('../controllers/review.controllers');
const middlewareController = require('../controllers/middlewares.controllers');
const passport = require('passport');
const SmsController = require('../controllers/sms.controllers.js')


router.route("/isLoggedIn").get(middlewareController.isLoggedIn)
router.route("/logOut").post(middlewareController.logOut)

router.post('/sendSMS', SmsController.sendSMS)

router.route('/patientLogin')
    .post(passport.authenticate('patientlocal', { failureFlash: true, failureRedirect: '/loginfailed', keepSessionInfo: true }), catchAsync(PatientController.loginPatient))

router.route('/patientSignup')
    .post(catchAsync(PatientController.signupPatient))

router.get('/patientLogout', PatientController.logoutPatient)

router.route('/doctorLogin')
    .post(passport.authenticate('doctorlocal', { failureFlash: true, failureRedirect: '/loginfailed', keepSessionInfo: true }), catchAsync(DoctorController.loginDoctor))

router.route('/doctorSignup')
    .post(catchAsync(DoctorController.signupDoctor))

router.get('/doctorLogout', DoctorController.logoutDoctor)


router.route('/changePatientProfile')
    .post(PatientController.changePhoto);

router.route('/changeDoctorProfile')
    .post(DoctorController.changePhoto);

router.route('/edit/:id')
    .put(PatientController.editBasicPatient)
router.route("/patient/:id").get(middlewareController.isUser,middlewareController.isThePatient,PatientController.showPatientData)
router.route("/patientUnprotected/:id").get(PatientController.showPatientData)
router.route("/ShowPatForDoc/:id").get(PatientController.showPatientData)

router.route("/doctor/:id").get(middlewareController.isUser,middlewareController.isTheDoctor,DoctorController.showDoctorData)
router.route("/searchDoctors").post((req, res) => {
    try {
        console.log(`I will search (${req.body.searchQuery})`)
    } catch (error) {
        console.log(error);
    }

})

router.get('/allDocs', DoctorController.getAllDocs)
router.get('/allPats', PatientController.getAllPats)
router.get('/myDocs', DoctorController.getMyDocs)
router.get('/getDocsForSpec/:spec/:docId', DoctorController.getDocsForSpec)
router.get('/myPats', PatientController.getMyPats)

router.route("/addReport/:patientId").post(ReportController.addReport)
router.route("/addDrug/:patientId").post(DrugController.addDrug)
router.route("/addOperation/:patientId").post(OperationController.addOperation)
router.route("/addAnalysis/:patientId").post(AnalysisController.addAnalysis)

router.route("/getReport/:reportId").get(ReportController.getReport)
router.route("/getAnalysis/:analysisId").get(AnalysisController.getAnalysis)


router.route("/findOpForDoc/:docId").get(OperationController.findOpForDoc)
router.route("/getPastWeek").get(AnalysisController.getPastWeek)

router.route("/getPastWeekAnalysis").get(AnalysisController.getPastWeekAnalysis)
router.route("/getPastWeekScans").get(AnalysisController.getPastWeekScans)
router.route("/getPastWeekReports").get(ReportController.getPastWeekReports)

router.route("/reportGetChronic/:reportId").get(ReportController.getReportChronic)
router.route("/myReports/:patId").get(ReportController.getMyReports)
router.route("/myDrugs/:patId").get(DrugController.getMyDrugs)
router.route("/myAnalysis/:patId").get(AnalysisController.getmyAnalysis)
router.route("/myScans/:patId").get(AnalysisController.getmyScans)
router.route("/myOperations/:patId").get(OperationController.getMyOperations)


router.route("/isReviewd/:doctorId").get(ReviewController.isReviewd)
router.route("/addReview/:doctorId").post(ReviewController.addReview)

router.route("/ShowDocForAny/:id").get(DoctorController.showDoctorData)




router.route("/temp/:id").put(PatientController.tempAddDoctors)
router.route("/findPatient/:patientSerial").get(PatientController.findPatientBySerial)
router.route("/doctor/sendReq").post(DoctorController.sendReqToPatient)
router.route("/patient/addDoctor/:doctorId").post(PatientController.acceptDoctor)
router.route("/patient/rejectDoctor/:doctorId").post(PatientController.rejectDoctor)
router.route("/patient/removeDoctor/:doctorId").post(PatientController.removeDoctor)
    ,
    router.route('/loginfailed')
        .get((req, res) => {
            try {
                console.log('Wrong Email or Password')
                res.send({ 'loginFailed': 'true' })
            } catch (error) {
                console.log(error);
            }

        })

router.use(errorHandler.handle);
module.exports = router;

// Selection Data 
const SpecialityData = ['ALLERGY AND IMMUNOLOGY', 'CARDIOLOGY', 'COLON AND RECTAL SURGERY', 'DERMATOLOGY', 'GENERAL SURGERY', 'NEUROLOGY', 'VASCULAR SURGERY', 'PATHOLOGY'].map(
    item => ({ label: item, value: item })
);
const CountryData = ['Egypt', 'Saudi Arabia', 'Maroco', 'Tunsia', 'Lebanon', 'Iraq', 'Algeria', 'Kweit', 'Qatar'].map(
    item => ({ label: item, value: item })
);
const CityData = ['Cairo', 'Alexandria', 'Daqahlia', 'Qalyoubia', 'Gharbia', 'Sharqia', 'Aswan', 'Luxor'].map(
    item => ({ label: item, value: item })
);
const TownData = ['Cairo', 'Tanta', 'Mansoura', 'Zagazig', 'Benha', 'Sadat', '6th October', 'Giza'].map(
    item => ({ label: item, value: item })
);