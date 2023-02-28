using MySql.Data.MySqlClient;

string cs = @"server=containers-us-west-194.railway.app;port=6266;userid=root;password=b8Qk3tyeXtAXvXAAOcXh;database=railway;";

using var con = new MySqlConnection(cs);
con.Open();

Console.WriteLine($"MySQL version : {con.ServerVersion}");

async void querySqlTable(string sqlCommand)
{
    var command = new MySqlCommand(sqlCommand, con);
    var reader = await command.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
        var value = reader.GetValue(1); // Displays value if value is returned "1" is column 2
        Console.WriteLine(value.ToString());
    }
}

querySqlTable("INSERT INTO testTable (id, test) values ('3','yesyesyes');");
