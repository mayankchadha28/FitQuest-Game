using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.SceneManagement;

public class SceneController : MonoBehaviour
{
    public Button nextSceneButton;

    void Start()
    {
        // Attach the button click event to the method
        nextSceneButton.onClick.AddListener(NextScene);
    }

    void NextScene()
    {
        // Get the current active scene index
        int currentSceneIndex = SceneManager.GetActiveScene().buildIndex;

        // Load the next scene in the build settings
        SceneManager.LoadScene(currentSceneIndex + 1);
    }
}
