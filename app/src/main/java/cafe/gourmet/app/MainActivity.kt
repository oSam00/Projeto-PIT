package cafe.gourmet.app

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.cafe.gourmet.R

class R {

}

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("MainActivity", "onCreate started")
        setContentView(R.layout.activity_main)
        Log.d("MainActivity", "setContentView completed")
    }
}