import { React, useState, useEffect } from 'react'
import { FlexboxGrid, Col, Divider, Rate } from 'rsuite';
import { useParams } from 'react-router-dom';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import "./showDocForAny.css"
import Map from '../../components/map/map';
import ReactMap from '../../components/ReactMapGl/ReactMapGl';
import DoctorReviewListItem from '../../components/doctorReviewListItem/doctorReviewListItem';
import DoctorSpecItemList from '../../components/doctorSpecItemList/doctorSpecItemList';



const ShowDocForAny = () => {
    const [doctor, setDoctor] = useState("")
    const [myOp, setMyOp] = useState("")
    const [myPatients, setMyPatients] = useState("")
    const [rating, setRating] = useState(false)
    const [docReviews, setDocReviews] = useState(false)
    const [docsSpec, setDocsSpec] = useState(false)

    const { docId } = useParams();

    useEffect(() => {
        try {
            Promise.all([
                fetch(`http://localhost:8000/ShowDocForAny/${docId}`, { credentials: 'include' }),
                fetch(`http://localhost:8000/findOpForDoc/${docId}`, { credentials: 'include' }),
            ])
                .then(([resDoctor, resOperations]) =>
                    Promise.all([resDoctor.json(), resOperations.json()])
                )
                .then(([dataDoctor, dataOperations]) => {
                    setDoctor(dataDoctor);
                    setMyOp(dataOperations);
                }, [])
        } catch (err) {
            console.log(err);
        }
    }, [])


    useEffect(() => {
        if (doctor.speciality) {
            fetch(`http://localhost:8000/getDocsForSpec/${doctor.speciality}/${docId}`, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        let tempDocsSpec = data.map((doc, index) => {
                            console.log('the id')
                            console.log(doc.id)
                            return (
                                <DoctorSpecItemList photo={doc.photo} doctorName={doc.doctorName} rating={doc.rating} location={doc.location} id={doc.id} />
                            )
                        })
                        setDocsSpec(tempDocsSpec)

                    } else {
                        setDocsSpec(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>No other Doctors</h5>)

                    }
                });
        }
    }, [doctor])

    useEffect(() => {
        if (doctor) {
            let patientsList = [...doctor.patientsList.map((P) => { return P.patient })]
            setMyPatients(patientsList)
            setRating(doctor.rating.toFixed(2))
        }
    }, [doctor])

    useEffect(() => {
        if (doctor) {
            let reviewsList = [...doctor.reviews.map((R) => {
                return { rDate: R.date, rReviewPara: R.reviewPara, rRating: R.rating }
            })];
            console.log(reviewsList)
            if (reviewsList.length > 0) {
                let tempReviews = reviewsList.map((review, index) => {
                    return (
                        <DoctorReviewListItem rDate={review.rDate} rReviewPara={review.rReviewPara} rRating={review.rRating} />
                    )
                })
                setDocReviews(tempReviews)

            } else {
                setDocReviews(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>No Reviews</h5>)

            }
        }
    }, [doctor])




    return (
        <div className='container raise'>

            <FlexboxGrid justify="space-around">
                <FlexboxGrid.Item as={Col} colspan={7} lg={7} xl={7} sm={8} xs={24}>
                    <div className='basicDocShow'>

                        <FlexboxGrid justify="space-between">
                            <FlexboxGridItem colspan={10}>
                                {(doctor?.profilePicture?.url) ? (
                                    <img src={doctor.profilePicture.url} alt='userImg' className='userImg margin_profile' />
                                ) : (
                                    <img src={require("../../images/userImg.png")} alt='userImg' className='userImg' />
                                )}
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={13} className='right_userinfo_card'>
                                <FlexboxGrid align='bottom' className='any_info_container'>
                                    <FlexboxGridItem colspan={20}>
                                        <h2 className='Any_fullName'>{doctor.fullName}</h2>
                                        <p className='Any_info'>{doctor.speciality}</p>
                                        <p className='info'> Age : {doctor.age}</p>
                                        <p className='info'> Gender : {doctor.gender}</p>
                                    </FlexboxGridItem>
                                    <FlexboxGridItem colspan={8}>
                                    </FlexboxGridItem>
                                </FlexboxGrid>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                        <FlexboxGrid justify="space-around" className="any_rating" >
                            <FlexboxGridItem colspan={9}>
                                {(rating || (rating === 0)) && <Rate readOnly defaultValue={parseFloat(rating)} allowHalf size="sm" />}
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={8}>
                                <p className='rating_value'>{rating}</p>
                            </FlexboxGridItem>
                        </FlexboxGrid>

                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={7} lg={7} xl={7} sm={8} xs={24}>
                    <div className='basicDocShow'>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={16}>
                                <div className='Any_statsMini Any_orangeStat'>
                                    <p className="miniStatTitle">Total Patients</p>
                                    <p className="miniStatNumber">{myPatients.length}</p>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={16}>
                                <div className='Any_statsMini Any_blueStat'>
                                    <p className="miniStatTitle">Total Operations</p>
                                    <p className="miniStatNumber">{myOp.length}</p>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={6} lg={6} xl={10} sm={24} xs={24} >
                    <div className='basicDocShow' >
                        {(doctor?.geometry?.coordinates) ? (
                            <ReactMap lng={doctor.geometry.coordinates[1]} lat={doctor.geometry.coordinates[0]} className="mapbox" />
                        ) : (
                            <Map lng={-30} lat={-30} className="mapbox" />
                        )}
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <FlexboxGrid justify="center">
                <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
                    <div className='userDashboardCard myDoctorsCard' >
                        <FlexboxGrid justify='center' >

                            <FlexboxGridItem colspan={8} className="review_Title" >
                                <h1 className='green_sub'>Reviews</h1>
                            </FlexboxGridItem>

                        </FlexboxGrid>
                        <Divider className='divider' ></Divider>
                        <div className='myDoctorsContent scrollable'>
                            {(docReviews) ? (
                                docReviews
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
                    <div className='userDashboardCard myDoctorsCard' >
                        <FlexboxGrid justify='center' >

                            <FlexboxGridItem colspan={18} className="review_Title" >
                                <h1 className='green_sub_field'>{doctor.speciality} DOCTORS</h1>
                            </FlexboxGridItem>

                        </FlexboxGrid>
                        <Divider className='divider' ></Divider>
                        <div className='myDoctorsContent scrollable'>
                            {console.log(docsSpec)}
                            {(docsSpec) ? (
                                docsSpec
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </FlexboxGrid.Item>

            </FlexboxGrid>

        </div>
    )
}

export default ShowDocForAny