const specialities1 = require('../data/specialities1');

exports.specialitiesData=async(req,res)=>{

  const specialities= await specialities1.create({
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
      name: "Anasthesiology",
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
      name: "Diabetolgy",
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
 

exports.getSpecialities = async(req, res) => {
  
  const resSpecial = await specialities1.find()
  try {
    res.status(200).json({
      data : resSpecial
     });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching specialties', error: error.message });
  }
};