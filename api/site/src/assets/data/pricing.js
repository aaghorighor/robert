const PRICE_PLANS = [
    {
        image: "/img/others/img-1.png",
        price: "£10",
        raw: "10",
        duration: "30 days",
        billingCycle: "Monthly",
        planName: "Basic",
        index :1,      
        currency : "£",
        live_priceId: "price_1HiLxAJ9QQF7JMlNBZvGeR43",
        priceId: "price_1HDVRhJ9QQF7JMlNSdnkB7l4",
        features: [
            "Service Time Management",
            "Fundraising Campaigns",                
            "Online Giving ",         
            "Multi-Platform Access",
            "Event Management",
            "Dedicated Customer Support",
            "Data Security and Privacy"            
        ]
    },
    {
        image: "/img/others/img-2.png",
        price: "£50",
        raw: "50",
        duration: "Every 6 months",
        billingCycle: "Every 6 months",
        planName: "Premium",
        currency : "£",
        index :2,     
        live_priceId: "price_1HiLxAJ9QQF7JMlNAiqlLjPv",
        priceId: "price_1HDVRhJ9QQF7JMlNxp77CsjK",
        features: [
            "Service Time Management",
            "Fundraising Campaigns",                
            "Online Giving ",         
            "Multi-Platform Access",
            "Event Management",
            "Dedicated Customer Support",
            "Data Security and Privacy"   
        ]
    },
    {
        image: "/img/others/img-3.png",
        price: "£100",
        raw: "100",
        duration: "Yearly",
        billingCycle: "Yearly",
        planName: "Premium Plus",
        currency : "£",
        index :3,   
        live_priceId: "price_1HiLxAJ9QQF7JMlNjRxbndF2",
        priceId: "price_1HHWPsJ9QQF7JMlN2X4BTJC3",
        features: [
            "Service Time Management",
            "Fundraising Campaigns",                
            "Online Giving ",         
            "Multi-Platform Access",
            "Event Management",
            "Dedicated Customer Support",
            "Data Security and Privacy"           
        ]
    }
]

const fetchPrice = (priceId) => { 
    return PRICE_PLANS.find(x => x.priceId === priceId) || {}
}

export {PRICE_PLANS, fetchPrice}



