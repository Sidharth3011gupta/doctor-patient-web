const specialities1 = require('../data/specialities1');
const User=require("../models/User")

exports.specialitiesData=async(req,res)=>{

  const specialities1= await specialities1.create({
    specialities1:[
    {
      name: "Gastroenterology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731308675/image_vmllcp.png",
    },
    {
      name: "Child and Adolescent Psychiatry",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731308839/image2_oxtcwf.png",
    },
    {
      name: "Bone Marrow",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731308869/image3_cuagjx.png",
    },
    {
      name: "Anesthesiology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731308891/image4_gxxyxk.png",
    },
    {
      name: "Dermatology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731308900/image5_kf6hsx.png",
    },
    {
      name: "Breast & Oncolplastic:Oncology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309245/image6_dsr4n1.png",
    },
    {
      name: "Dental",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309264/image7_idojqn.png",
    },
    {
      name: "Emergency Medicine",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309271/image8_bzhkuj.png",
    },
    {
      name: "Clinical Psychology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309286/image9_wpbdqz.png",
    },
    {
      name: "Cranio-Maxillo Facial Surgery",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309345/image10_njujcr.png",
    },
    {
      name: "Cardiology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309532/image11_cicdi2.png",
    },
    {
      name: "ENT",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309537/image12_dcysqz.png",
    },
    {
      name: "Audiology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309552/image13_vlqenb.png",
    },
    {
      name: "Cardiac Surgery",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309563/image14_zgqrhz.png",
    },
    {
      name: "Clinical Nutrition & Dietetics",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309580/image15_kdux4a.png",
    },
    {
      name: "Cosmetology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309598/image16_rnhroi.png",
    },
    {
      name: "Diabetology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309611/image17_b55x2x.png",
    },
    {
      name: "Endocrinology and Diabetology",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309620/image18_qqnenc.png",
    },
    {
      name: "Critical Care Medicine",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309636/image19_ayr4wk.png",
    },
    {
      name: "Developmental Behavioral Pediatrics",
      imageurl: "https://res.cloudinary.com/duwfnvak4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731309653/image20_tpfw7f.png",
    }]
  }
  )
}
 

exports.getSpecialities = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
       const specialitiesDoc = await specialities1.findOne({}, { 
      specialities1: { 
        $slice: [(page - 1) * limit, Number(limit)] 
      } 
    });

   
    const totalSpecialities = await specialities1.aggregate([
      { $project: { total: { $size: "$specialities1" } } }
    ]);

    if (!specialitiesDoc) {
      return res.status(404).json({ message: "No specialties found" });
    }

    res.status(200).json({
      total: totalSpecialities[0]?.total || 0,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil((totalSpecialities[0]?.total || 0) / limit),
      data: specialitiesDoc.specialities1,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching specialties', error: error.message });
  }
};
exports.getSpecialityByName = async (req, res) => {
  try {
    const { speciality } = req.query;
    if (!speciality) {
      return res.status(400).json({ message: 'Please provide a speciality to search' });
    }
    const result = await specialities1.findOne({
      specialities1: { $elemMatch: { name: new RegExp(speciality, 'i') } },
    });
    if (!result) {
      return res.status(404).json({ message: `No doctors found for speciality: ${speciality}` });
    }
    const matchingSpecialities = result.specialities1.filter((spec) =>
      new RegExp(speciality, 'i').test(spec.name)
    );

    if (matchingSpecialities.length === 0) {
      return res.status(404).json({ message: `No doctors found for speciality: ${speciality}` });
    }

    res.status(200).json({ specialization: matchingSpecialities });
  } catch (error) {
    res.status(500).json({ message: 'Error searching for doctors by speciality', error: error.message });
  }
};
exports.getDoctorsBySpeciality = async (req, res) => {
  try {
    const { speciality } = req.params;
    const doctors = await User.find({
      role: "doctor",
      specialization: { $regex: new RegExp(speciality, "i") },
    }).select("name specialization years experience ConsultationFee experiencemonths clinicAddress mobile_number profile");

    if (doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No doctors found for the specified specialization",
      });
    }

    res.status(200).json({
      success: true,
      message: `${doctors.length} doctor(s) found with specialization: ${speciality}`,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
      error: error.message,
    });
  }
};