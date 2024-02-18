using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using TMPro;
using UnityEngine.Android;
using UnityEngine.InputSystem;

public class SensorData : MonoBehaviour
{
    public TMP_Text gem_count;
    public TMP_Text level;

    
    // Start is called before the first frame update
    void Start()
    {
        if (!Permission.HasUserAuthorizedPermission("android.permission.ACTIVITY_RECOGNITION"))
        {
            Permission.RequestUserPermission("android.permission.ACTIVITY_RECOGNITION");
        }
        gem_count.text = "Start";
        InputSystem.EnableDevice(StepCounter.current);
        StepCounter.current.MakeCurrent();
        if (StepCounter.current.enabled)
            gem_count.text = "Step Counter";
        
            //level.text = StepCounter.current.stepCounter.ReadValue().ToString();
        level.text = StepCounter.current.stepCounter.ReadDefaultValue().ToString();
        //level.text = StepCounter.current.Re÷;
        Debug.Log("Step is enabled");
    }

    // Update is called once per frame
    void Update()
    {
        level.text = StepCounter.current.stepCounter.ReadValue().ToString();
    }
}
