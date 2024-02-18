using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class WebRequest : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        // Replace the URL with the actual endpoint you want to query
        string url = "https://jsonplaceholder.typicode.com/todos/1";

        // Start the coroutine to make the GET request
        StartCoroutine(MakeGetRequest(url));
    }

    IEnumerator MakeGetRequest(string url)
    {
        // Create a UnityWebRequest object with the specified URL
        using (UnityWebRequest webRequest = UnityWebRequest.Get(url))
        {
            // Send the request and wait for a response
            yield return webRequest.SendWebRequest();

            // Check for errors
            if (webRequest.isNetworkError || webRequest.isHttpError)
            {
                Debug.LogError("Error: " + webRequest.error);
            }
            else
            {
                // Successfully received a response
                Debug.Log("Received: " + webRequest.downloadHandler.text);

                // You can parse or handle the response data here
            }
        }
    }
}
