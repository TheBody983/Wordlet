<?php $title= 'Wordlet'; ?>
<?php ob_start(); ?>



<?php echo '<div>';?>
    <p>Je suis sur la page main.</p>
<?php echo '</div>'; ?>



<?php $content = ob_get_clean(); ?>
<?php include 'layout.php'; ?>