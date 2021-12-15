$mysqlnet=[Reflection.Assembly]::LoadWithPartialName("MySql.Data")
if(-not $mysqlnet)
{
    Write-Error "Erreur connexion bdd"
    Exit
}

$dbuser = "admin" 
$dbpwd = "t2Gvk@EbR.H9_)dJ"
$dbname = "wordlet" 
$dbhost = "localhost" 
$dbport = 3306 

$connectionString = "server=$dbhost;port=$dbport;uid=$dbuser;pwd=$dbpwd;database=$dbname"

$conn = New-Object MySql.Data.MySqlClient.MySqlConnection($connectionString) 

$conn.Open()

$query = "
(select mot from `lexique_francais` where cgram regexp 'NOM' and freqlivres > 10 and mot not regexp ' ' order by rand() limit 4)
union
(select mot from `lexique_francais` where cgram regexp 'VER' and freqlivres > 10 and mot not regexp ' ' order by rand() limit 4)
union
(select mot from `lexique_francais` where cgram regexp 'ART|PRO' and freqlivres > 200 and mot not regexp ' ' order by rand() limit 4)
union
(select mot from `lexique_francais` where cgram regexp 'CON|PRE' and freqlivres > 400 and mot not regexp ' ' order by rand() limit 4)
union
(select mot from `lexique_francais` where cgram regexp 'ADV|ADJ' and freqlivres > 20 and mot not regexp ' ' order by rand() limit 4);
"

$MysqlCmd = New-Object MySql.Data.MySqlClient.MySqlCommand($query, $conn)    
$DataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter($MysqlCmd) 
$DataSet = New-Object System.Data.DataSet  
$DataAdapter.Fill($DataSet, "data")
$words = $DataSet.Tables.Rows.mot
$words

$confirmation = Read-Host "minter ces mots ? (y/n)"
if ($confirmation -eq 'y') {

    $words = '[\"' + ($words -join '\",\"') + '\"]' 

	flow transactions send --network testnet --signer wordlet ./cadence/transactions/WordToken/mint-and-sell.tx.cdc ('"' + $words + '"') "original"

}


