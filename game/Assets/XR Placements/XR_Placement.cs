using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class XR_Placement : MonoBehaviour
{
    [SerializeField] private GameObject prefab;
    //[SerializeField] private Sprite gems;
    [SerializeField] private GameObject environment;


    private List<GameObject> spawnedPrefabs;
    private ARRaycastManager raycastManager;

    private float timer = 0f;
    public float interval = 20f;

    // Start is called before the first frame update
    void Start()
    {
        raycastManager = GetComponent<ARRaycastManager>();
        spawnedPrefabs = new List<GameObject>();

        ARRaycasting2(new Vector2(Screen.width / 2, Screen.height / 2));

        void ARRaycasting2(Vector2 pos)
        {
            List<ARRaycastHit> hits = new List<ARRaycastHit>();

            if (raycastManager.Raycast(pos, hits, TrackableType.PlaneEstimated))
            {
                Pose pose = hits[0].pose;
                ARInstantiation2(pose.position, pose.rotation);
            }
        }

        void ARInstantiation2(Vector3 pos, Quaternion rot)
        {
            // Ensure that the prefab is assigned in the Inspector
            if (environment != null)
            {
                // Instantiate the prefab at the specified position and rotation
                GameObject spawnedObject = Instantiate(environment, pos, rot);
                spawnedPrefabs.Add(spawnedObject);
            }
            else
            {
                Debug.LogError("Prefab not assigned in the Inspector!");
            }
        }

    }

    void ARRaycasting(Vector2 pos)
    {
        List<ARRaycastHit> hits = new List<ARRaycastHit>();

        if (raycastManager.Raycast(pos, hits, TrackableType.PlaneEstimated))
        {
            Pose pose = hits[0].pose;
            ARInstantiation(pose.position, pose.rotation);
        }
    }

    void ARInstantiation(Vector3 pos, Quaternion rot)
    {
        // Ensure that the prefab is assigned in the Inspector
        if (prefab != null)
        {
            // Instantiate the prefab at the specified position and rotation
            GameObject spawnedObject = Instantiate(prefab, pos, rot);
            spawnedPrefabs.Add(spawnedObject);
        }
        else
        {
            Debug.LogError("Prefab not assigned in the Inspector!");
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.touchCount > 0)
        {
            //Touch touch = Input.GetTouch(0);
            //Vector2 touchPosition = touch.position;
            //ARRaycasting(touchPosition);
        }
        else if (Input.GetMouseButtonDown(0))
        {
            //Vector3 mousePos = Input.mousePosition;
            //Vector2 mousePos2D = new Vector2(mousePos.x, mousePos.y);
            //ARRaycasting(mousePos2D);
        }

        timer += Time.deltaTime;

        // Check if the timer has reached the desired interval (30 seconds)
        if (timer >= interval)
        {
            // Perform the action you want to execute every 30 seconds here
            ARRaycasting(new Vector2(Screen.width / 2, Screen.height / 2));

            // Reset the timer
            timer = 0f;
        }

        // Check proximity and delete spawned objects if closer
        CheckProximity();
    }

    void CheckProximity()
    {
        Vector3 cameraPosition = Camera.main.transform.position;

        foreach (GameObject spawnedObject in spawnedPrefabs)
        {
            float distance = Vector3.Distance(spawnedObject.transform.position, cameraPosition);

            // Adjust the threshold distance as needed
            float proximityThreshold = 2.0f;

            if (distance < proximityThreshold)
            {
                // If closer than the threshold, destroy the object
                Destroy(spawnedObject);
            }
        }

        // Remove the destroyed objects from the list
        spawnedPrefabs.RemoveAll(item => item == null);
    }
}
