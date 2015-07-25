package localoffers.offers.city.cityoffers;

import android.app.Activity;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentActivity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.support.v4.widget.DrawerLayout;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.app.Activity;
import android.app.AlertDialog.Builder;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.support.v4.app.Fragment;


public class CityOffers extends ActionBarActivity
        implements NavigationDrawerFragment.NavigationDrawerCallbacks {

    /**
     * Fragment managing the behaviors, interactions and presentation of the navigation drawer.
     */
    private NavigationDrawerFragment mNavigationDrawerFragment;

    /**
     * Used to store the last screen title. For use in {@link #restoreActionBar()}.
     */
    private CharSequence mTitle;
    SQLiteDatabase db;

    @Override
        protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_city_offers);

    mNavigationDrawerFragment = (NavigationDrawerFragment)
            getSupportFragmentManager().findFragmentById(R.id.navigation_drawer);
    mTitle = getTitle();

    // Set up the drawer.
    mNavigationDrawerFragment.setUp(
            R.id.navigation_drawer,
            (DrawerLayout) findViewById(R.id.drawer_layout));
    db = openOrCreateDatabase("CityOffers", Context.MODE_PRIVATE, null);
    db.execSQL("CREATE TABLE IF NOT EXISTS test(name VARCHAR,password VARCHAR,email VARCHAR,area VARCHAR);");

    }

    @Override
    public void onNavigationDrawerItemSelected(int position) {
        // update the main content by replacing fragments
        FragmentManager fragmentManager = getSupportFragmentManager();
        fragmentManager.beginTransaction()
                .replace(R.id.container, PlaceholderFragment.newInstance(position + 1))
                .commit();
    }
public void OnClickNewUser(View v){
    try{
        setContentView(R.layout.newuserregister);

        Spinner  dropdown = (Spinner)findViewById(R.id.spinner);
        String[] items = new String[]{"MVP","Pendurthy","NAD","Dwaraka Nagar"};
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, items);
        dropdown.setAdapter(adapter);


    }catch(Exception e){
        Toast.makeText(CityOffers.this,
                "Error in New User:"+e.getMessage(),
                Toast.LENGTH_LONG).show();
        System.out.println("Error in on Click"+e.getMessage());}

}

    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(this, CityOffers.class);
        startActivity(intent);
    }
    public void onButtonClickedUserRegister(View v )
    {

        try{
            TextView clickMeText1 = (TextView)findViewById(R.id.editText3);
            TextView clickMeText2 = (TextView)findViewById(R.id.editText4);
            TextView clickMeText3 = (TextView)findViewById(R.id.editText6);
            TextView clickMeText4 = (TextView)findViewById(R.id.editText7);
            Spinner  clickMeText5 = (Spinner)findViewById(R.id.spinner);
            if( clickMeText2.getText().toString().trim().equals(clickMeText3.getText().toString().trim())==false) {

                Toast.makeText(CityOffers.this,
                        "Password Does not Match..Please Enter again",
                        Toast.LENGTH_LONG).show();
            }
            if(clickMeText1.getText().toString().trim().length()==0||clickMeText2.getText().toString().trim().length()==0||clickMeText3.getText().toString().trim().length()==0||clickMeText4.getText().toString().trim().length() == 0) {

                showMessage("Error", "Please enter all values");
                return;
            }
            db.execSQL("INSERT INTO test values('" + clickMeText1.getText() + "','" + clickMeText2.getText() + "','" + clickMeText4.getText() + "','" + clickMeText5.getSelectedItem() + "');");
            Toast.makeText(CityOffers.this,
                    "User Created",
                    Toast.LENGTH_LONG).show();
          //  super.onBackPressed();
            this.onBackPressed();
        //    setContentView(R.layout.activity_city_offers);
            mNavigationDrawerFragment = (NavigationDrawerFragment)
                    getSupportFragmentManager().findFragmentById(R.id.navigation_drawer);
            mTitle = getTitle();

            // Set up the drawer.
            mNavigationDrawerFragment.setUp(
                    R.id.navigation_drawer,
                    (DrawerLayout) findViewById(R.id.drawer_layout));

           }catch(Exception e){
            Toast.makeText(CityOffers.this,
                    "Error in Insert:"+e.getMessage(),
                    Toast.LENGTH_LONG).show();
            System.out.println(""+e.getMessage());}
    }

    public void showMessage(String title,String message)
    {
        Builder builder=new Builder(this);
        builder.setCancelable(true);
        builder.setTitle(title);
        builder.setMessage(message);
        builder.show();
    }

    public void onSectionAttached(int number) {
        switch (number) {
            case 1:
                mTitle = getString(R.string.title_section1);
                break;
            case 2:
                mTitle = getString(R.string.title_section2);
                break;
            case 3:
                mTitle = getString(R.string.title_section3);
                break;
        }
    }

    public void restoreActionBar() {
        ActionBar actionBar = getSupportActionBar();
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);
        actionBar.setDisplayShowTitleEnabled(true);
        actionBar.setTitle(mTitle);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (!mNavigationDrawerFragment.isDrawerOpen()) {
            // Only show items in the action bar relevant to this screen
            // if the drawer is not showing. Otherwise, let the drawer
            // decide what to show in the action bar.
            getMenuInflater().inflate(R.menu.city_offers, menu);
            restoreActionBar();
            return true;
        }
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
public static class UserRegister extends Fragment{
    @Override
    public View onCreateView(LayoutInflater inflater,
                             ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.newuserregister,
                container, false);
    }



}
    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {
        /**
         * The fragment argument representing the section number for this
         * fragment.
         */
        private static final String ARG_SECTION_NUMBER = "section_number";

        /**
         * Returns a new instance of this fragment for the given section
         * number.
         */
        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_city_offers, container, false);
            return rootView;
        }

        @Override
        public void onAttach(Activity activity) {
            super.onAttach(activity);
            ((CityOffers) activity).onSectionAttached(
                    getArguments().getInt(ARG_SECTION_NUMBER));
        }
    }

}
