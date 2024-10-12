const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Review = require("../models/Review");

const isReviewd = async (req, res) => {
    console.log('isReviewd called')
    if (req.user) {
        const patientId = req.user._id
        const patient = await Patient.findById(patientId)
        const { doctorId } = req.params;
        const doctor = await Doctor.findById(doctorId).populate({ path: 'reviews', options: { lean: true } });
        const review = await Review.findOne({ patient: patient, doctor: doctor })
        var final
        if (review) {
            console.log('found')
            console.log(review.rating)
            console.log(review.reviewPara)
            final = {
                found: true,
                rate: review.rating,
                reviewPara: review.reviewPara
            }
        } else {
            console.log('notFound')
            final = {
                found: false,
            }
        }
    }
    res.send(final);
}
const average = arr => {
    if (arr.length === 0) {
        return 0;
    }
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
};

const addReview = async (req, res) => {
    console.log('addReview called')
    if (req.user) {
        const { reviewPara } = req.body.form
        const rate = req.body.rate
        console.log(rate)
        console.log(reviewPara)
        const patientId = req.user._id
        const patient = await Patient.findById(patientId)
        const { doctorId } = req.params;
        const doctor = await Doctor.findById(doctorId).populate({ path: 'reviews', options: { lean: true } });
        const review = await Review.findOne({ patient: patient, doctor: doctor })
        var finalReview
        if (!review) {
            console.log('not found')
            const review = new Review({})
            review.reviewPara = reviewPara;
            review.rating = rate;
            review.patient = patient;
            review.doctor = doctor;
            review.date = new Date()
            finalReview = await review.save();
            var newDoctorReviews = doctor.reviews
            newDoctorReviews.push(finalReview)
            await Doctor.findByIdAndUpdate(doctorId, { reviews: newDoctorReviews });
            arrOfRatings = newDoctorReviews.map(rev => rev.rating);
            console.log('the arrOfRatings are')
            console.log(arrOfRatings)
            await Doctor.findByIdAndUpdate(doctorId, { rating: average(arrOfRatings) });
        } else {
            console.log('found')
            const newReviews = doctor.reviews.filter(rev => rev._id.toString() !== review._id.toString());
            finalReview = await Review.findOneAndUpdate({ patient: patient, doctor: doctor }, { rating: rate, reviewPara: reviewPara, date: new Date() }, { new: true });
            newReviews.push(finalReview);
            await Doctor.findByIdAndUpdate(doctorId, { reviews: newReviews });
            arrOfRatings = newReviews.map(rev => rev.rating);
            console.log(arrOfRatings)
            await Doctor.findByIdAndUpdate(doctorId, { rating: average(arrOfRatings) });
        }
    }
    res.send();
};
module.exports = {
    isReviewd,
    addReview
}
