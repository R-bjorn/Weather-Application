import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const SubscriptionPlan = (props) => {
  return (
    // Button that takes them to individual payment methods
    <TouchableOpacity style={{height: 180, backgroundColor: 'white', 
      justifyContent: 'center', alignItems: 'center', 
      marginHorizontal: 20, borderRadius: 10,
      shadowColor: 'black', shadowOffset: { height: 10, width: 5}, 
      shadowOpacity: 0.5, shadowRadius: 3, marginBottom: 25
    }}>
      {/* View of the Plan */}
      <View style={{flexDirection: 'row'}}>
        {/* Introduction of the plan */}
        <View style={{height: 150, width: "45%", flex: 1, paddingHorizontal: 15, paddingVertical: 5}}>
          <Text style={{fontSize: 20, fontWeight: 800}}>{props.user}</Text>
          {(props.price == 0) ? <Text>free limited maps</Text> : <Text>$ {props.price} / month</Text>}

          <View style={{paddingVertical: 10}}>
            {(props.benifit1) ? <Text style={{ fontSize: 17, color: "#757575", marginBottom: 5 }}>{`\u2023 ${props.benifit1}`}</Text> : null} 
            {(props.benifit2) ? <Text style={{ fontSize: 17, color: "#757575", marginBottom: 5 }}>{`\u2023 ${props.benifit2}`}</Text> : null} 
            {(props.benifit3) ? <Text style={{ fontSize: 17, color: "#757575", marginBottom: 5 }}>{`\u2023 ${props.benifit3}`}</Text> : null} 
          </View>

          <View>
            <TouchableOpacity
              style={{width: 100, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 10, borderWidth: 2, borderColor: '#0014a7', backgroundColor: (props.enable) ? "#aab5ff" : '#fff'}}
            >
              <Text style={{ color: (props.enable) ? "#fff": "#000",  fontWeight: (props.enable) ? 800 : 400}}>{(props.enable) ? "Current plan" : "Get this plan"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Side Image of the plan */}
        <Image 
          source={require("../images/Welcome_BG.jpg")}
          style={{width: "35%", height: "100%", marginHorizontal: 5}}
        />
      </View>
    </TouchableOpacity>
  )
}

export default SubscriptionPlan