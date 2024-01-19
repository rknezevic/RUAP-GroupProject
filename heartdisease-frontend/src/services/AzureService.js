import axios from "axios";

class AzureService {
  async getHeartDiseasePrediction(
    highBP,
    highChol,
    smoker,
    stroke,
    diabetes,
    genHlth,
    physHlth,
    diffWalk,
    age,
    income
  ) {
    const requestBody = {
      Inputs: {
        input1: [
          {
            HighBP: highBP,
            HighChol: highChol,
            Smoker: smoker,
            Stroke: stroke,
            Diabetes: diabetes,
            GenHlth: genHlth,
            PhysHlth: physHlth,
            DiffWalk: diffWalk,
            Age: age,
            Income: income,
          },
        ],
      },
      GlobalParameters: {},
    };

    const apiKey = "XuHEZNLG0UFbe7q1ggswS4t47wVaQIa9";
    if (!apiKey) {
      throw new Error("A key should be provided to invoke the endpoint");
    }

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const url =
      "https://cors-anywhere.herokuapp.com/http://26e521c7-38a2-418a-b553-e3455c733fff.northeurope.azurecontainer.io/score";

    try {
      const response = await axios.post(url, requestBody, { headers });

      if (response.status === 200) {
        const result = response.data;
        console.log(
          "Result:",
          result.Results.WebServiceOutput0[0].Probability.toFixed(3),
          result
        );
        return result.Results.WebServiceOutput0[0].Probability.toFixed(3);
      } else {
        console.log(`The request failed with status code: ${response.status}`);
        console.log("Headers:", response.headers);
        console.log("Response Content:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

export default AzureService;
